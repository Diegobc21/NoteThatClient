import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPasswordButtonComponent } from './show-password-button.component';

describe('ShowPasswordButtonComponent', () => {
  let component: ShowPasswordButtonComponent;
  let fixture: ComponentFixture<ShowPasswordButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPasswordButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPasswordButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
