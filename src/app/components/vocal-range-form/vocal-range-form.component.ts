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
    // Build the form
    this.rangeForm = this.fb.group({
      register1ExtremeHigh: [''],
      register1High: ['G3'],
      register1MidStop: ['A#2'],
      register1MidStart: ['B1'],
      register1Low: ['G1'],
      register1Fry: ['E1'],

      register2ExtremeHigh: [''],
      register2High: ['C#4'],
      register2MidStop: ['G#3'],
      register2MidStart: ['C3'],
      register2Low: ['A#2'],
    });

    // Load from localStorage if in browser
    if (this.isBrowser) {
      const saved = localStorage.getItem('vocalRange');
      if (saved) {
        try {
          this.rangeForm.patchValue(JSON.parse(saved));
        } catch {
          console.warn('Could not parse saved vocalRange');
        }
      }
    }

    // On changes: debounce, then save & emit
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
