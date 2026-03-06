import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stock } from './stock';
import { StockService } from '../stock.service';

describe('Stock', () => {
  let component: Stock;
  let fixture: ComponentFixture<Stock>;
  const stockServiceStub: Pick<StockService, 'subscribeMedicines' | 'addMedicine'> = {
    subscribeMedicines: () => () => {},
    addMedicine: () => Promise.resolve(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stock],
      providers: [{ provide: StockService, useValue: stockServiceStub }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
