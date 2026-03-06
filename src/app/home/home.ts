import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  patientName = '';
  dob = '';
  contact = '';
  doctorAppointed = 'Dr. Ayush Singh';
  date = '';
  time = '11:00 AM';

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  onPatientNameChange(value: string): void {
    this.patientName = value.replace(/[^a-zA-Z\s]/g, '');
  }

  onContactChange(value: string): void {
    this.contact = value.replace(/\D/g, '').slice(0, 10);
  }

  async bookAppointment(): Promise<void> {
    const patientName = this.patientName.trim();
    const doctorAppointed = this.doctorAppointed.trim();
    const appointmentDate = this.date.trim();
    const phoneNumber = this.contact.trim();

    if (!patientName || !doctorAppointed || !appointmentDate || !phoneNumber) {
      alert('Please enter patient name, contact number, doctor, and appointment date');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(patientName)) {
      alert('Patient name must contain only letters');
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      alert('Contact number must be exactly 10 digits');
      return;
    }

    try {
      await this.appointmentService.addAppointment({
        patientName,
        doctorAppointed,
        appointmentDate,
        phoneNumber,
      });

      alert('Appointment saved to Firebase successfully');
      this.patientName = '';
      this.contact = '';
      this.date = '';
      this.time = '11:00 AM';
      this.doctorAppointed = 'Dr. Ayush Singh';
    } catch {
      alert('Failed to save appointment to Firebase');
    }
  }

  async goToPatient(): Promise<void> {
    await this.router.navigate(['/patient']);
  }
}
