import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';

import { db } from './firebase';

export type Appointment = {
  id?: string;
  patientName: string;
  doctorAppointed: string;
  appointmentDate: string;
  phoneNumber?: string;
  contactNumber?: string;
};

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly appointmentsRef = collection(db, 'appointments');

  addAppointment(appointment: Omit<Appointment, 'id'>): Promise<unknown> {
    return addDoc(this.appointmentsRef, appointment);
  }

  subscribeAppointments(callback: (appointments: Appointment[]) => void): () => void {
    const q = query(this.appointmentsRef, orderBy('appointmentDate', 'asc'));

    return onSnapshot(q, (snapshot) => {
      const appointments: Appointment[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Appointment, 'id'>),
      }));

      callback(appointments);
    });
  }

  updateAppointment(id: string, payload: Partial<Omit<Appointment, 'id'>>): Promise<void> {
    return updateDoc(doc(db, 'appointments', id), payload);
  }

  deleteAppointment(id: string): Promise<void> {
    return deleteDoc(doc(db, 'appointments', id));
  }
}
