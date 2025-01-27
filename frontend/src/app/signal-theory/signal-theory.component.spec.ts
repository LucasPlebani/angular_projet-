import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalTheoryComponent } from './signal-theory.component';

describe('SignalTheoryComponent', () => {
  let component: SignalTheoryComponent;
  let fixture: ComponentFixture<SignalTheoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalTheoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalTheoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
