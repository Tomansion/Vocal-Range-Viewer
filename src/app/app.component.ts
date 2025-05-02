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
    console.log('Selected Range:', this.selectedRange);
  }

  getChestVoiceHighlightRanges(): HighlightRange[] {
    if (!this.selectedRange) return [];

    const ranges: HighlightRange[] = [];

    // Add mid range
    if (
      this.selectedRange.register1MidStart &&
      this.selectedRange.register1MidStop
    ) {
      ranges.push({
        from: this.selectedRange.register1MidStart,
        to: this.selectedRange.register1MidStop,
        color: 'blue',
      });
    }

    // Add high range
    if (
      this.selectedRange.register1MidStop &&
      this.selectedRange.register1High
    ) {
      ranges.push({
        from: this.selectedRange.register1MidStop,
        to: this.selectedRange.register1High,
        color: 'purple',
      });
    }

    // Add Extreme high range
    if (
      this.selectedRange.register1High &&
      this.selectedRange.register1ExtremeHigh
    ) {
      ranges.push({
        from: this.selectedRange.register1High,
        to: this.selectedRange.register1ExtremeHigh,
        color: 'red',
      });
    }
    // Add low range
    if (
      this.selectedRange.register1Low &&
      this.selectedRange.register1MidStart
    ) {
      ranges.push({
        from: this.selectedRange.register1Low,
        to: this.selectedRange.register1MidStart,
        color: 'purple',
      });
    }
    // Add fry range
    if (this.selectedRange.register1Fry && this.selectedRange.register1Low) {
      ranges.push({
        from: this.selectedRange.register1Fry,
        to: this.selectedRange.register1Low,
        color: 'red',
      });
    }

    console.log(ranges);

    return ranges;
  }
  getHeadVoiceHighlightRanges(): HighlightRange[] {
    if (!this.selectedRange) return [];

    const ranges: HighlightRange[] = [];

    // Add mid range
    if (
      this.selectedRange.register2MidStart &&
      this.selectedRange.register2MidStop
    ) {
      ranges.push({
        from: this.selectedRange.register2MidStart,
        to: this.selectedRange.register2MidStop,
        color: 'blue',
      });
    }

    // Add high range
    if (
      this.selectedRange.register2MidStop &&
      this.selectedRange.register2High
    ) {
      ranges.push({
        from: this.selectedRange.register2MidStop,
        to: this.selectedRange.register2High,
        color: 'purple',
      });
    }

    // Add Extreme high range
    if (
      this.selectedRange.register2High &&
      this.selectedRange.register2ExtremeHigh
    ) {
      ranges.push({
        from: this.selectedRange.register2High,
        to: this.selectedRange.register2ExtremeHigh,
        color: 'red',
      });
    }
    // Add low range
    if (
      this.selectedRange.register2Low &&
      this.selectedRange.register2MidStart
    ) {
      ranges.push({
        from: this.selectedRange.register2Low,
        to: this.selectedRange.register2MidStart,
        color: 'purple',
      });
    }

    return ranges;
  }
}
