import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoKeyboardComponent } from './piano-keyboard.component';

describe('PianoKeyboardComponent', () => {
  let component: PianoKeyboardComponent;
  let fixture: ComponentFixture<PianoKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PianoKeyboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PianoKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
