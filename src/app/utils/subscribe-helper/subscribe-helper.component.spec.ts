import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeHelperComponent } from './subscribe-helper.component';

describe('SubscribeHelperComponent', () => {
  let component: SubscribeHelperComponent;
  let fixture: ComponentFixture<SubscribeHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeHelperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscribeHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
