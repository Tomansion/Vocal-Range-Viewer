import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocalRangeFormComponent } from './vocal-range-form.component';

describe('VocalRangeFormComponent', () => {
  let component: VocalRangeFormComponent;
  let fixture: ComponentFixture<VocalRangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocalRangeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocalRangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
