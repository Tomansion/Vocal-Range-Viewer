// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  VocalRange,
  VocalRangeFormComponent,
} from './components/vocal-range-form/vocal-range-form.component';
import { PianoKeyboardComponent } from './components/piano-keyboard/piano-keyboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    VocalRangeFormComponent,
    PianoKeyboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedRange?: VocalRange;

  onRangeSubmit(range: VocalRange) {
    this.selectedRange = range;
  }
}
