import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Patient } from './patient/patient';
import { Stock } from './stock/stock';
import { Bill } from './bill/bill';
import { Doctor } from './doctor/doctor';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'patient', component: Patient, canActivate: [authGuard] },
  { path: 'stock', component: Stock, canActivate: [authGuard] },
  { path: 'bill', component: Bill, canActivate: [authGuard] },
  { path: 'doctor', component: Doctor, canActivate: [authGuard] },
];
