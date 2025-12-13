import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoComponent } from './promo.component';

describe('PromoComponent', () => {
  let component: PromoComponent;
  let fixture: ComponentFixture<PromoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromoComponent]
    });
    fixture = TestBed.createComponent(PromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
