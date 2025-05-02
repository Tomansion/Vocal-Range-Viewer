import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vocal-range-form',
  templateUrl: './vocal-range-form.component.html',
  styleUrls: ['./vocal-range-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class VocalRangeFormComponent {
  rangeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rangeForm = this.fb.group({
      lowNote: ['E1', Validators.required],
      highNote: ['D#4', Validators.required],
      chestEnd: ['G3', Validators.required],
      headStart: ['A#2', Validators.required],
    });
  }

  onSubmit() {
    if (this.rangeForm.valid) {
      const params = this.rangeForm.value;
      // emit or pass to keyboard component
    }
  }
}
