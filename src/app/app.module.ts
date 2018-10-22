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
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {DoctorAComponent } from './doctor-a/doctor-a.component';
import {MatListModule} from '@angular/material/list';
import {appRoutes} from './routes';

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
   //  { useHash: true }
    // {enableTracing: true}
    ),
    HttpClientModule
  ],
  providers: [
    OpentokService,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
