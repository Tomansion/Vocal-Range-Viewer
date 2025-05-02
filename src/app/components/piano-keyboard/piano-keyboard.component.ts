import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HighlightRange {
  from: string;
  to: string;
  color: string;
}

@Component({
  selector: 'app-piano-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './piano-keyboard.component.html',
  styleUrls: ['./piano-keyboard.component.scss'],
})
export class PianoKeyboardComponent {
  @Input() highlights: HighlightRange[] = [];

  notes = this.generateNotes();

  private generateNotes(): string[] {
    const octaves = 8;
    const baseNotes = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ];
    const notes: string[] = [];
    for (let octave = 1; octave <= octaves; octave++) {
      baseNotes.forEach((n) => notes.push(`${n}${octave}`));
    }
    return notes;
  }

  isBlackKey(note: string): boolean {
    return note.includes('#');
  }

  private inRange(idx: number, start: string, end: string): boolean {
    const i0 = this.notes.indexOf(start);
    const i1 = this.notes.indexOf(end);
    return i0 >= 0 && i1 >= 0 && idx >= i0 && idx <= i1;
  }

  getHighlightColor(note: string): string {
    const idx = this.notes.indexOf(note);
    for (const h of this.highlights) {
      if (this.inRange(idx, h.from, h.to)) return h.color;
    }
    return '';
  }

  isHighlighted(note: string): boolean {
    return !!this.getHighlightColor(note);
  }
}
