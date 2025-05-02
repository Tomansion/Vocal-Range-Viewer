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
  register1ExtremeHigh: string;
  register1High: string;
  register1Mid: string;
  register1Low: string;
  register1Fry: string;
  register2ExtremeHigh: string;
  register2High: string;
  register2Mid: string;
  register2Low: string;
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
      register1ExtremeHigh: ['D#4', Validators.required],
      register1High: ['G3', Validators.required],
      register1Mid: ['E2', Validators.required],
      register1Low: ['C2', Validators.required],
      register1Fry: ['B1', Validators.required],
      register2ExtremeHigh: ['A4', Validators.required],
      register2High: ['F4', Validators.required],
      register2Mid: ['D4', Validators.required],
      register2Low: ['B3', Validators.required],
    });

    // Listen for form changes and emit the updated values
    this.rangeForm.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      if (this.rangeForm.valid) {
        console.log('Form value changed:', value);

        this.rangeSubmit.emit(value as VocalRange);
      }
    });
  }
}
