import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AppComponent } from './app.component';
import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { OpentokService } from './opentok.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient , HttpHandler } from '@angular/common/http';
import { RouterModule, Routes , LoadChildren , LoadChildrenCallback } from '@angular/router';
import { DoctoraComponent } from './doctora/doctora.component';
import {DoctorbComponent} from './doctorb/doctorb.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import {DoctorAComponent } from './doctor-a/doctor-a.component';
import {MatListModule} from '@angular/material/list';
const appRoutes: Routes = [
  {path: '', redirectTo: 'doctor', pathMatch: 'full'},
  { path: 'doctora',  component: DoctoraComponent },
  { path: 'mydoctor',  component: DoctorAComponent },
  { path: 'mydoctor/:name',  component: DoctorAComponent },
  { path: 'doctorb', component: DoctorbComponent },
  { path : 'doctor', component: DoctorComponent  },
  {path : 'patient' , component : PatientComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    DoctorAComponent,
    PublisherComponent,
    SubscriberComponent,
    DoctoraComponent,
    PagenotfoundComponent,
    DoctorbComponent,
    DoctorComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    HttpClientModule
  ],
  providers: [
    OpentokService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
