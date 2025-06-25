import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime } from 'rxjs/operators';
import {
  Component,
  EventEmitter,
  Output,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface VocalRange {
  register1ExtremeHigh?: string;
  register1High?: string;
  register1MidStop?: string;
  register1MidStart?: string;
  register1Low?: string;
  register1Fry?: string;
  register2ExtremeHigh?: string;
  register2High?: string;
  register2MidStart?: string;
  register2MidStop?: string;
  register2Low?: string;
}

// Validator for French note names (Do, Ré, Mi, ... with/without accent, any case, with optional #, octave 1-8)
export function frenchNoteValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    // Accept: Do, Do#, Ré, Re, Ré#, Re#, Mi, Fa, Fa#, Sol, Sol#, La, La#, Si (any case, with/without accent), octave 1-8
    const regex = /^(do#?|ré#?|re#?|mi|fa#?|sol#?|la#?|si)([1-8])$/i;
    if (regex.test(value.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
      return null;
    }
    return { invalidNote: true };
  };
}

@Component({
  selector: 'app-vocal-range-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './vocal-range-form.component.html',
  styleUrls: ['./vocal-range-form.component.scss'],
})
export class VocalRangeFormComponent implements OnInit {
  @Output() rangeSubmit = new EventEmitter<VocalRange>();

  rangeForm!: FormGroup;
  private isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Build the form with default values in French notation (Do, Ré, Mi, ...)
    this.rangeForm = this.fb.group({
      register1ExtremeHigh: ['', [frenchNoteValidator()]],
      register1High: ['Sol3', [frenchNoteValidator()]],
      register1MidStop: ['La#2', [frenchNoteValidator()]],
      register1MidStart: ['Si1', [frenchNoteValidator()]],
      register1Low: ['Sol1', [frenchNoteValidator()]],
      register1Fry: ['Mi1', [frenchNoteValidator()]],

      register2ExtremeHigh: ['', [frenchNoteValidator()]],
      register2High: ['Do#4', [frenchNoteValidator()]],
      register2MidStop: ['Sol#3', [frenchNoteValidator()]],
      register2MidStart: ['Do3', [frenchNoteValidator()]],
      register2Low: ['La#2', [frenchNoteValidator()]],
    });

    // Load from localStorage if in browser
    if (this.isBrowser) {
      const saved = localStorage.getItem('vocalRange');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Check if any value contains English notation (A, B, C, D, E, F, G)
          const englishNoteRegex = /\b([A-G])(#|b)?\d\b/;
          const hasEnglish = Object.values(parsed).some(
            (v) => typeof v === 'string' && englishNoteRegex.test(v)
          );
          if (!hasEnglish) {
            // French notation detected, patch the form (patching means updating only the values that are present)
            this.rangeForm.patchValue(parsed);
          } else {
            // Ignore if English notation is detected
            console.warn(
              'English notation detected, ignoring saved vocalRange'
            );
          }
        } catch {
          console.warn('Could not parse saved vocalRange');
        }
      }
    }

    // On changes: debounce (witch prevents too many updates), validate, and emit
    this.rangeForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: VocalRange) => {
        if (this.rangeForm.valid) {
          if (this.isBrowser) {
            localStorage.setItem('vocalRange', JSON.stringify(value));
          }
          this.rangeSubmit.emit(value);
        }
      });

    // Emit initial value (and save once) if browser
    const initial = this.rangeForm.value as VocalRange;
    if (this.isBrowser) {
      localStorage.setItem('vocalRange', JSON.stringify(initial));
    }
    this.rangeSubmit.emit(initial);
  }
}
