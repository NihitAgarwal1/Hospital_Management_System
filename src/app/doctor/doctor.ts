import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Appointment, AppointmentService } from '../appointment.service';
import { DoctorProfile, DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor',
  imports: [RouterLink],
  templateUrl: './doctor.html',
  styleUrl: './doctor.css',
})
export class Doctor implements OnInit, OnDestroy {
  doctors: DoctorProfile[] = [];
  appointments: Appointment[] = [];
  expandedDoctorId: string | null = null;

  private unsubscribeDoctors: (() => void) | null = null;
  private unsubscribeAppointments: (() => void) | null = null;

  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.doctorService.ensureDefaultDoctors();
    } catch {
      alert('Failed to initialize doctors from Firebase');
    }

    this.unsubscribeDoctors = this.doctorService.subscribeDoctors((doctors) => {
      this.doctors = doctors;
    });

    this.unsubscribeAppointments = this.appointmentService.subscribeAppointments((appointments) => {
      this.appointments = appointments;
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribeDoctors) {
      this.unsubscribeDoctors();
      this.unsubscribeDoctors = null;
    }

    if (this.unsubscribeAppointments) {
      this.unsubscribeAppointments();
      this.unsubscribeAppointments = null;
    }
  }

  toggleDoctor(doctorId: string): void {
    this.expandedDoctorId = this.expandedDoctorId === doctorId ? null : doctorId;
  }

  patientsForDoctor(doctorName: string): Appointment[] {
    return this.appointments.filter((a) => a.doctorAppointed === doctorName);
  }
}
