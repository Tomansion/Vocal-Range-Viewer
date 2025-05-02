import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { VocalRangeFormComponent } from './components/vocal-range-form/vocal-range-form.component';
import { PianoKeyboardComponent } from './components/piano-keyboard/piano-keyboard.component';

@NgModule({
  declarations: [AppComponent, VocalRangeFormComponent, PianoKeyboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Material modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
