import { RouterModule, Routes } from '@angular/router';
import { DoctoraComponent } from './doctora/doctora.component';
import {DoctorbComponent} from './doctorb/doctorb.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {DoctorAComponent } from './doctor-a/doctor-a.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AppComponent } from './app.component';
export const appRoutes: Routes = [
  {path: '', component: AppComponent},
  { path: 'doctora',  component: DoctoraComponent },
  { path: 'mydoctor',  component : DoctoraComponent },
  { path: 'mydoctor/:name',  component : DoctorAComponent },
  { path: 'doctorb', component: DoctorbComponent },
  { path : 'doctor/:name', component: DoctorComponent  },
  {path : 'patient' , component : PatientComponent },
  {path : 'patient/:name' , component : PatientComponent },
  { path : '**' , component : PagenotfoundComponent } ,
];
