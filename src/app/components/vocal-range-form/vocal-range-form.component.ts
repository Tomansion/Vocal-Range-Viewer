import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime } from 'rxjs/operators';

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
export class VocalRangeFormComponent {
  @Output() rangeSubmit = new EventEmitter<VocalRange>();
  constructor(private fb: FormBuilder) {}

  rangeForm!: FormGroup;

  ngOnInit() {
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

    // Listen for form changes and emit the updated values
    this.rangeForm.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      if (this.rangeForm.valid) {
        console.log('Form value changed:', value);

        this.rangeSubmit.emit(value as VocalRange);
      } else {
        console.log('Form is invalid');
        // Display the full error messages
        Object.keys(this.rangeForm.controls).forEach((key) => {
          const control = this.rangeForm.get(key);
          if (control && control.invalid) {
            console.log(`${key} is invalid:`, control.errors);
          }
        });
      }
    });

    this.rangeSubmit.emit(this.rangeForm.value as VocalRange);
  }
}
