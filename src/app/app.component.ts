import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpentokService } from './opentok.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as OT from '@opentok/client';
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
  token: string;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  wel = true;
  end = false;
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
    callerReason = null;
    audioVideo: 'audioVideo';
    sessionId = '2_MX40NjE1MjQ1Mn5-MTUzNDUyNzk5MTY0NH5zenRtcm50WlpLSE4wNWtTQVZuUXYrSkZ-UH4';
  constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService, private http: HttpClient) {
    this.changeDetectorRef = ref;
  }

  ngOnInit () {
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
