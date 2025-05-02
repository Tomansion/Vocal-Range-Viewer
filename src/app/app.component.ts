// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  VocalRange,
  VocalRangeFormComponent,
} from './components/vocal-range-form/vocal-range-form.component';
import {
  PianoKeyboardComponent,
  HighlightRange,
} from './components/piano-keyboard/piano-keyboard.component';

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

  getHighlightRanges(): HighlightRange[] {
    if (!this.selectedRange) {
      return [];
    }

    const ranges: HighlightRange[] = [
      {
        from: this.selectedRange.register1ExtremeHigh,
        to: this.selectedRange.register1High,
        color: 'red',
      },
      {
        from: this.selectedRange.register1Mid,
        to: this.selectedRange.register1Low,
        color: 'blue',
      },
      {
        from: this.selectedRange.register1Fry,
        to: this.selectedRange.register2ExtremeHigh,
        color: 'green',
      },
      {
        from: this.selectedRange.register2High,
        to: this.selectedRange.register2Mid,
        color: 'yellow',
      },
      {
        from: this.selectedRange.register2Low,
        to: 'C8',
        color: 'purple',
      },
    ];

    console.log('ranges', ranges);

    return ranges;
  }
}
