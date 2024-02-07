import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyBadgeComponent } from './copy-badge.component';

describe('CopyBadgeComponent', () => {
  let component: CopyBadgeComponent;
  let fixture: ComponentFixture<CopyBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
