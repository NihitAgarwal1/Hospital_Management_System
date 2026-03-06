import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Appointment, AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-bill',
  imports: [RouterLink, FormsModule],
  templateUrl: './bill.html',
  styleUrl: './bill.css',
})
export class Bill implements OnInit, OnDestroy {
  searchTerm = '';
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  billGenerated = false;

  private unsubscribe: (() => void) | null = null;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.unsubscribe = this.appointmentService.subscribeAppointments((appointments) => {
      this.appointments = appointments;
      this.filterPatients();
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  filterPatients(): void {
    const keyword = this.searchTerm.trim().toLowerCase();

    if (!keyword) {
      this.filteredAppointments = [];
      return;
    }

    this.filteredAppointments = this.appointments.filter((a) =>
      a.patientName.toLowerCase().includes(keyword)
    );
  }

  onEnterSearch(): void {
    const keyword = this.searchTerm.trim().toLowerCase();
    if (!keyword) {
      this.billGenerated = false;
      this.selectedAppointment = null;
      return;
    }

    const exactMatch = this.filteredAppointments.find(
      (a) => a.patientName.toLowerCase() === keyword
    );

    if (exactMatch) {
      this.generateBill(exactMatch);
      return;
    }

    if (this.filteredAppointments.length > 0) {
      this.generateBill(this.filteredAppointments[0]);
      return;
    }

    alert('No patient found');
  }

  generateBill(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    this.searchTerm = appointment.patientName;
    this.filteredAppointments = [];
    this.billGenerated = true;
  }

  getConsultantFee(doctorName: string): number {
    if (doctorName === 'Dr. Ayush Singh') {
      return 700;
    }

    if (doctorName === 'Dr. Subh') {
      return 600;
    }

    if (doctorName === 'Dr. Priya') {
      return 500;
    }

    return 0;
  }
}
