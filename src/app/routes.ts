import { RouterModule, Routes } from '@angular/router';
import { DoctoraComponent } from './doctora/doctora.component';
import {DoctorbComponent} from './doctorb/doctorb.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {DoctorAComponent } from './doctor-a/doctor-a.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
export const appRoutes: Routes = [
  {path: '', component: AppComponent},
  { path: 'doctora',  component: DoctoraComponent },
  { path: 'doctorwaiting',  component : DoctorAComponent },

  { path: 'login',  component : LoginComponent },
  { path: 'doctorwaiting/:name',  component : DoctorAComponent },
  { path: 'doctorb', component: DoctorbComponent },
  { path : 'doctor/:name', component: DoctorComponent  },
  {path : 'patient' , component : PatientComponent },
  {path : 'video/:name' , component : PatientComponent },
  { path : 'pagenotfound' , component : PagenotfoundComponent } ,
  { path : '**' , component : PagenotfoundComponent } ,
];
