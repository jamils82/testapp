import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AppComponent } from './app.component';
import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { OpentokService } from './opentok.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient , HttpHandler } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DoctoraComponent } from './doctora/doctora.component';
import {DoctorbComponent} from './doctorb/doctorb.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    SubscriberComponent,
    DoctoraComponent,
    PagenotfoundComponent,
    DoctorbComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [
    OpentokService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
