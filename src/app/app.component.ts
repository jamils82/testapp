import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpentokService } from './opentok.service';
import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as OT from 'opentok-angular';
import {DoctoraComponent} from './doctora/doctora.component';
import { appRoutes } from './routes';
import { cleanSession } from 'selenium-webdriver/safari';
export interface Cat {
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ OpentokService ]
})
export class AppComponent implements OnInit {
  closeResult: string;
  title = 'Angular Basic Video Chat';
  session: OT.Session;
  token = '123';
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  wel = true;
  end = false;
  config: any;
  call = false;
  onHold = false;
    subscriberOpts: {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
     constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService, private http: HttpClient , private route: Router) {
    this.changeDetectorRef = ref;
  }

  ngOnInit () {
   // this.getCat();
   this.route.navigate(['/doctor']);
  }
  errorHandler(err) {
    if (err && err.message) {
     console.log(err);
      // UIkit.notification(err.message, { pos: 'bottom-left', status: 'danger' })
    }
  }
  getCat() {
    return this.http.get('https://doctestapp.herokuapp.com/api/cat', {responseType: 'text'}).subscribe( data => {
      // console.log(data);
      // this.token = data;
      // alert(this.token);
      console.log(this.token);
    });
  }
  hidediv() {
   // this.opentokService.gettoken(this.token);
     this.route.navigate(['/doctorb']);
   // console.log(JSON.stringify(this.token));
    this.wel = !this.wel;
    this.call = true;
    this.end = true;
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      this.session.on('streamCreated', (event) => {
        console.log(session);
        this.streams.push(event.stream);
        this.changeDetectorRef.detectChanges();
      });
      this.session.on('streamDestroyed', (event) => {
        const idx = this.streams.indexOf(event.stream);
        if (idx > -1) {
          this.streams.splice(idx, 1);
          this.changeDetectorRef.detectChanges();
        }
      });
    })
    .then(() => this.opentokService.connect())
    .catch((err) => {
      console.error(err);
      alert('Unable to connect. Make sure you have Internet Working.');
    });
  }
  onSubmit() {
   /* // tslint:disable-next-line:max-line-length
    axios.post('http://localhost:8000/dial' )
    .then(res => {
      this.caller = res.data.caller;
      this.otConnect(res.data.apiKey, res.data.caller.sessionId, res.data.caller.token);
    })
    .catch(console.log);*/
  }
  endcall() {
    this.session.disconnect();
    this.end = false;
    this.wel = !this.wel;
    this.call = !this.call;
  }
  doctor() {
    this.wel = !this.wel;
    this.route.navigate(['/doctora']);
  }
  patient() {
    this.wel = !this.wel;
    this.route.navigate(['/doctorb']);
  }
}
