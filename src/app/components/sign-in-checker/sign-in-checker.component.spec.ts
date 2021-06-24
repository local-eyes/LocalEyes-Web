import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInCheckerComponent } from './sign-in-checker.component';

describe('SignInCheckerComponent', () => {
  let component: SignInCheckerComponent;
  let fixture: ComponentFixture<SignInCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
