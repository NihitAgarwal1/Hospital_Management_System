import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Appointment, AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-patient',
  imports: [RouterLink, FormsModule],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class Patient implements OnInit, OnDestroy {
  appointments: Appointment[] = [];
  editingId: string | null = null;
  editPatientName = '';
  editDoctorAppointed = '';
  editAppointmentDate = '';

  private unsubscribe: (() => void) | null = null;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.unsubscribe = this.appointmentService.subscribeAppointments((appointments) => {
      this.appointments = appointments;
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  startEdit(item: Appointment): void {
    this.editingId = item.id ?? null;
    this.editPatientName = item.patientName;
    this.editDoctorAppointed = item.doctorAppointed;
    this.editAppointmentDate = item.appointmentDate;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editPatientName = '';
    this.editDoctorAppointed = '';
    this.editAppointmentDate = '';
  }

  async saveEdit(item: Appointment): Promise<void> {
    const id = item.id;
    if (!id) {
      alert('Unable to update: missing appointment id');
      return;
    }

    const patientName = this.editPatientName.trim();
    const doctorAppointed = this.editDoctorAppointed.trim();
    const appointmentDate = this.editAppointmentDate.trim();

    if (!patientName || !doctorAppointed || !appointmentDate) {
      alert('Please fill all fields before saving');
      return;
    }

    try {
      await this.appointmentService.updateAppointment(id, {
        patientName,
        doctorAppointed,
        appointmentDate,
      });
      this.cancelEdit();
      alert('Patient record updated');
    } catch {
      alert('Failed to update patient record');
    }
  }

  async deleteAppointment(item: Appointment): Promise<void> {
    const id = item.id;
    if (!id) {
      alert('Unable to delete: missing appointment id');
      return;
    }

    const shouldDelete = confirm('Delete this patient record?');
    if (!shouldDelete) {
      return;
    }

    try {
      await this.appointmentService.deleteAppointment(id);
      alert('Patient record deleted');
    } catch {
      alert('Failed to delete patient record');
    }
  }
}
