import { RouterModule, Routes } from '@angular/router';
import { DoctoraComponent } from './doctora/doctora.component';
import {DoctorbComponent} from './doctorb/doctorb.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {DoctorAComponent } from './doctor-a/doctor-a.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
export const appRoutes: Routes = [
  {path: '', redirectTo: 'doctor', pathMatch: 'full'},
  { path: 'doctora',  component: DoctoraComponent },
  { path: 'mydoctor',  component : DoctoraComponent },
  { path: 'mydoctor/:name',  component : DoctorAComponent },
  { path: 'doctorb', component: DoctorbComponent },
  { path : 'doctor', component: DoctorComponent  },
  {path : 'patient' , component : PatientComponent },
  {path : '*' , component : PagenotfoundComponent },
];
