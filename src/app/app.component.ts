import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpentokService } from './opentok.service';
import { Injectable } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as OT from 'opentok-angular';
import {DoctoraComponent} from './doctora/doctora.component';
import { cleanSession } from 'selenium-webdriver/safari';
export interface Cat {
  name: string;
}

const appRoutes: Routes = [
  { path: 'doctora',  component: DoctoraComponent },
];


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
  token: string;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  wel = true;
  end = false;
  config: any;
  call = false;
  onHold = false;
    agentConnected = false;
    caller = null;
    agentStream = null;
    subscriberOpts: {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
    callerName = null;
    API_KEY: '46168292';
    SESSION_ID: '2_MX40NjE2ODI5Mn5-MTUzNjg2ODUzNjc4OX5tY0FuRkQwUExhQ21sWHNDMVE5cFFaenl-fg';
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    TOKEN: 'T1==cGFydG5lcl9pZD00NjE2ODI5MiZzaWc9OTc1YTU3MGQ4Y2NjYjZiOWYyNjc3YTYzNzYwNGZiY2M4ZDBiZTFhODpzZXNzaW9uX2lkPTJfTVg0ME5qRTJPREk1TW41LU1UVXpOamcyT0RVek5qYzRPWDV0WTBGdVJrUXdVRXhoUTIxc1dITkRNVkU1Y0ZGYWVubC1mZyZjcmVhdGVfdGltZT0xNTM2ODY4NTUyJm5vbmNlPTAuNzE2MjIxODgwOTQ2Njg4OSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTM5NDYwNTQ0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
    callerReason = null;
    audioVideo: 'audioVideo';
    sessionId = '2_MX40NjE1MjQ1Mn5-MTUzNDUyNzk5MTY0NH5zenRtcm50WlpLSE4wNWtTQVZuUXYrSkZ-UH4';
  constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService, private http: HttpClient , private route: Router) {
    this.changeDetectorRef = ref;
  }

  ngOnInit () {
    this.initCamera({ video: true, audio: true });
   /* this.getCat().subscribeOn((dataFromServer) => {
      // Now you can use the data
      // alert(dataFromServer);
      this.token = JSON.stringify(dataFromServer);
      console.log(this.token);
      this.opentokService.settoken(dataFromServer);
    });
    // console.log(this.getAllCats());
  */
  }
  errorHandler(err) {
    if (err && err.message) {
     console.log(err);
      // UIkit.notification(err.message, { pos: 'bottom-left', status: 'danger' })
    }
  }

  initCamera(config: any) {
    const browser = <any>navigator;
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
    });
  }
  hidediv() {
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
}
