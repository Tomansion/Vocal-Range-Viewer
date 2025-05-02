import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { VocalRangeFormComponent } from './components/vocal-range-form/vocal-range-form.component';
import { PianoKeyboardComponent } from './components/piano-keyboard/piano-keyboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VocalRangeFormComponent, PianoKeyboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Vocal-Range-Viewer';
}
