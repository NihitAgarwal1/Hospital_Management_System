import { Injectable } from '@angular/core';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { db } from './firebase';

export type MedicineStock = {
  id?: string;
  name: string;
  category: string;
  quantity: number;
  cost: number;
  expiry: string;
};

@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly medicinesRef = collection(db, 'medicines');

  addMedicine(medicine: Omit<MedicineStock, 'id'>): Promise<unknown> {
    return addDoc(this.medicinesRef, medicine);
  }

  subscribeMedicines(callback: (medicines: MedicineStock[]) => void): () => void {
    const q = query(this.medicinesRef, orderBy('name', 'asc'));

    return onSnapshot(q, (snapshot) => {
      const medicines: MedicineStock[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<MedicineStock, 'id'>),
      }));

      callback(medicines);
    });
  }
}
