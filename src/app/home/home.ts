import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  patientName: string = '';
  dob: string = '';
  contact: string = '';
  date: string = '';
  time: string = '';

  bookAppointment() {
    alert(`Appointment booked for ${this.patientName} on ${this.date} at ${this.time}`);
  }
}
