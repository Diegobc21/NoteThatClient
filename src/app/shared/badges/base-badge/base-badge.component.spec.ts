import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseBadgeComponent } from './base-badge.component';

describe('BaseBadgeComponent', () => {
  let component: BaseBadgeComponent;
  let fixture: ComponentFixture<BaseBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
