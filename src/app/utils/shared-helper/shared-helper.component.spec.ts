import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedHelperComponent } from './shared-helper.component';

describe('SharedHelperComponent', () => {
  let component: SharedHelperComponent;
  let fixture: ComponentFixture<SharedHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedHelperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
