import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDashboarComponent } from './buyer-dashboar.component';

describe('BuyerDashboarComponent', () => {
  let component: BuyerDashboarComponent;
  let fixture: ComponentFixture<BuyerDashboarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerDashboarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerDashboarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
