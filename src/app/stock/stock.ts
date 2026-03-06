import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

import { MedicineStock, StockService } from '../stock.service';

@Component({
  selector: 'app-stock',
  imports: [RouterLink, FormsModule],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class Stock implements OnInit, OnDestroy {
  medicineName = "";
  category = "";
  quantity: string | number | null = "";
  cost: string | number | null = "";
  expiry = "";

  medicines: MedicineStock[] = [];
  private unsubscribe: (() => void) | null = null;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.unsubscribe = this.stockService.subscribeMedicines((medicines) => {
      this.medicines = medicines;
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  async addMedicine(): Promise<void> {
    const name = String(this.medicineName ?? "").trim();
    const category = String(this.category ?? "").trim();
    const quantityValue = String(this.quantity ?? "").trim();
    const costValue = String(this.cost ?? "").trim();
    const expiry = String(this.expiry ?? "").trim();

    if (!name || !category || !quantityValue || !costValue || !expiry) {
      alert("Please fill all fields");
      return;
    }

    const quantity = Number(quantityValue);
    const cost = Number(costValue);

    if (Number.isNaN(quantity) || Number.isNaN(cost)) {
      alert("Quantity and cost must be valid numbers");
      return;
    }

    try {
      await this.stockService.addMedicine({
        name,
        category,
        quantity,
        cost,
        expiry
      });
    } catch {
      alert("Failed to save medicine in database");
      return;
    }

    this.medicineName = "";
    this.category = "";
    this.quantity = "";
    this.cost = "";
    this.expiry = "";
  }
}
