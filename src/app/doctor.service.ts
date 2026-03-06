import { Injectable } from '@angular/core';
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';

import { db } from './firebase';

export type DoctorProfile = {
  id: string;
  name: string;
  arrivalTime: string;
  leavingTime: string;
};

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private readonly doctorsRef = collection(db, 'doctors');
  private seeded = false;

  async ensureDefaultDoctors(): Promise<void> {
    if (this.seeded) {
      return;
    }

    const defaults: DoctorProfile[] = [
      { id: 'dr-ayush-singh', name: 'Dr. Ayush Singh', arrivalTime: '10:00 AM', leavingTime: '9:00 PM' },
      { id: 'dr-subh', name: 'Dr. Subh', arrivalTime: '10:00 AM', leavingTime: '9:00 PM' },
      { id: 'dr-priya', name: 'Dr. Priya', arrivalTime: '10:00 AM', leavingTime: '9:00 PM' },
    ];

    await Promise.all(
      defaults.map((doctor) =>
        setDoc(
          doc(db, 'doctors', doctor.id),
          {
            name: doctor.name,
            arrivalTime: doctor.arrivalTime,
            leavingTime: doctor.leavingTime,
          },
          { merge: true }
        )
      )
    );

    this.seeded = true;
  }

  subscribeDoctors(callback: (doctors: DoctorProfile[]) => void): () => void {
    const q = query(this.doctorsRef, orderBy('name', 'asc'));

    return onSnapshot(q, (snapshot) => {
      const doctors: DoctorProfile[] = snapshot.docs.map((d) => {
        const data = d.data() as Omit<DoctorProfile, 'id'>;
        return {
          id: d.id,
          name: data.name,
          arrivalTime: data.arrivalTime,
          leavingTime: data.leavingTime,
        };
      });

      callback(doctors);
    });
  }
}
