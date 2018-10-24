import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule , MatGridTile } from '@angular/material';
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
import {MatListModule } from '@angular/material/list';
import {appRoutes} from './routes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import { LoginComponent } from './login/login.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('934578814329-nf04nbgu4j6ck5ovf1e4jbbdsue31i24.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('264609584201676')
  },

]);

export function provideConfig() {
  return config;
}

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
    PatientComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    SocialLoginModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
     { useHash: false }
    // {enableTracing: true}
    ),
    HttpClientModule
  ],
  providers: [
    OpentokService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
 //   {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
