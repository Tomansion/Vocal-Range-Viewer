import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-piano-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './piano-keyboard.component.html',
  styleUrls: ['./piano-keyboard.component.scss'],
})
export class PianoKeyboardComponent {
  @Input() highlightFrom?: string;
  @Input() highlightTo?: string;
  @Input() highlightColor?: string;

  notes = this.generateNotes();

  private generateNotes(): string[] {
    const octaves = 8; // From C1 to C8
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
      for (const note of baseNotes) {
        notes.push(`${note}${octave}`);
      }
    }

    return notes;
  }

  isHighlighted(note: string): boolean {
    if (!this.highlightFrom || !this.highlightTo) return false;

    const fromIdx = this.notes.indexOf(this.highlightFrom);
    const toIdx = this.notes.indexOf(this.highlightTo);
    const idx = this.notes.indexOf(note);
    return idx >= fromIdx && idx <= toIdx;
  }

  getNoteClass(note: string): { [key: string]: boolean } {
    const noteClass = note.toLowerCase().replace('#', 's');
    return {
      white: !note.includes('#'),
      black: note.includes('#'),
      [noteClass]: true,
    };
  }

  isBlackKey(note: string): boolean {
    return note.includes('#');
  }
}
