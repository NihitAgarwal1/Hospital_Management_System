import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-stock',
  imports: [RouterLink, FormsModule],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class Stock {
  medicineName = "";
  category = "";
  quantity: string | number | null = "";
  cost: string | number | null = "";
  expiry = "";

  medicines: Array<{
    name: string;
    category: string;
    quantity: number;
    cost: number;
    expiry: string;
  }> = [
    { name: "Paracetamol", category: "Painkiller", quantity: 120, cost: 0.15, expiry: "2026-03-10" },
    { name: "Chloroquine", category: "Antihistamine", quantity: 20, cost: 0.20, expiry: "2026-12-10" },
  ];

  addMedicine(): void {
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

    this.medicines.push({
      name,
      category,
      quantity,
      cost,
      expiry
    });

    this.medicineName = "";
    this.category = "";
    this.quantity = "";
    this.cost = "";
    this.expiry = "";
  }
}
