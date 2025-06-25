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

  // Converts French note names (Do, Ré, Mi, ...) to English notation (C, D, E, ...), case-insensitive and accent-insensitive
  private noteFrToAnglo(note: string): string {
    if (!note) return note;
    // Normalize: remove accents, uppercase first letter, lowercase rest
    const normalize = (s: string) =>
      s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/^([a-zA-Z]{2,3})/, (m) => m.charAt(0).toUpperCase() + m.slice(1).toLowerCase());
    const map: Record<string, string> = {
      'Do': 'C',
      'Do#': 'C#',
      'Re': 'D',
      'Re#': 'D#',
      'Mi': 'E',
      'Fa': 'F',
      'Fa#': 'F#',
      'Sol': 'G',
      'Sol#': 'G#',
      'La': 'A',
      'La#': 'A#',
      'Si': 'B',
    };
    // Accept both with and without accent, any case
    const regex = /^([a-zA-Z#éÉ]{2,4})(\d)$/i;
    const match = regex.exec(note);
    if (!match) return note;
    let base = match[1];
    const octave = match[2];
    // Remove accents for mapping
    base = normalize(base.replace('é', 'e').replace('É', 'E'));
    return `${map[base] || base}${octave}`;
  }

  getChestVoiceHighlightRanges(): HighlightRange[] {
    if (!this.selectedRange) return [];

    const ranges: HighlightRange[] = [];

    // Low notes (green)
    if (
      this.selectedRange.register1Low &&
      this.selectedRange.register1MidStart
    ) {
      ranges.push({
        from: this.noteFrToAnglo(this.selectedRange.register1Low),
        to: this.noteFrToAnglo(this.selectedRange.register1MidStart),
        color: 'green',
      });
    }
    // Infra-low (Fry) (dark green)
    if (this.selectedRange.register1Fry && this.selectedRange.register1Low) {
      ranges.push({
        from: this.noteFrToAnglo(this.selectedRange.register1Fry),
        to: this.noteFrToAnglo(this.selectedRange.register1Low),
        color: '#003800ff',
      });
    }
    // Medium (blue)
    if (
      this.selectedRange.register1MidStart &&
      this.selectedRange.register1MidStop
    ) {
      ranges.push({
        from: this.noteFrToAnglo(this.selectedRange.register1MidStart),
        to: this.noteFrToAnglo(this.selectedRange.register1MidStop),
        color: 'blue',
      });
    }
    // High (purple)
    if (
      this.selectedRange.register1MidStop &&
      this.selectedRange.register1High
    ) {
      ranges.push({
        from: this.noteFrToAnglo(this.selectedRange.register1MidStop),
        to: this.noteFrToAnglo(this.selectedRange.register1High),
        color: 'purple',
      });
    }
    // Very high (red)
    if (
      this.selectedRange.register1High &&
      this.selectedRange.register1ExtremeHigh
    ) {
      ranges.push({
        from: this.noteFrToAnglo(this.selectedRange.register1High),
        to: this.noteFrToAnglo(this.selectedRange.register1ExtremeHigh),
        color: 'red',
      });
    }
    return ranges;
  }

  getHeadVoiceHighlightRanges(): HighlightRange[] {
    if (!this.selectedRange) return [];

    const ranges: HighlightRange[] = [];

    // Low notes (green)
    if (
      this.selectedRange.register2Low &&
      this.selectedRange.register2MidStart
    ) {
      ranges.push({
        from: this.noteFrToAnglo(this.selectedRange.register2Low),
        to: this.noteFrToAnglo(this.selectedRange.register2MidStart),
        color: 'green',
      });
    }
    // Medium (blue)
    if (
      this.selectedRange.register2MidStart &&
      this.selectedRange.register2MidStop
    ) {
      ranges.push({
        from: this.noteFrToAnglo(this.selectedRange.register2MidStart),
        to: this.noteFrToAnglo(this.selectedRange.register2MidStop),
        color: 'blue',
      });
    }
    // High (purple)
    if (
      this.selectedRange.register2MidStop &&
      this.selectedRange.register2High
    ) {
      ranges.push({
        from: this.noteFrToAnglo(this.selectedRange.register2MidStop),
        to: this.noteFrToAnglo(this.selectedRange.register2High),
        color: 'purple',
      });
    }
    // Very high (red)
    if (
      this.selectedRange.register2High &&
      this.selectedRange.register2ExtremeHigh
    ) {
      ranges.push({
        from: this.noteFrToAnglo(this.selectedRange.register2High),
        to: this.noteFrToAnglo(this.selectedRange.register2ExtremeHigh),
        color: 'red',
      });
    }
    return ranges;
  }
}
