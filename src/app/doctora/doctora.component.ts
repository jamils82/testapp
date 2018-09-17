import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpentokService } from '.././opentok.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import * as OT from 'opentok-angular';
import { cleanSession } from 'selenium-webdriver/safari';
export interface Cat {
  name: string;
}
@Component({
  selector: 'app-doctora',
  templateUrl: './doctora.component.html',
  styleUrls: ['./doctora.component.css'],
  providers: [ OpentokService ]
})
export class DoctoraComponent implements OnInit {

  closeResult: string;
  title = 'Angular Basic Video Chat';
  session: OT.Session;
  token: string;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  wel = true;
  enter = true;
  end = false;
  call = false;
  callbut = false;
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
  constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService, private http: HttpClient , private route: Router) {
    this.changeDetectorRef = ref;
  }

  ngOnInit () {
    this.route.navigate(['/doctora']);
    this.getCat();
    this.hidediv();
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
  getCat() {
    return this.http.get('https://doctestapp.herokuapp.com/api/cat', {responseType: 'text'}).subscribe( data => {
      // console.log(data);
       this.token = data;
      // alert(this.token);
      console.log(this.token);
    });
  }
  errorHandler(err) {
    if (err && err.message) {
     console.log(err);
      // UIkit.notification(err.message, { pos: 'bottom-left', status: 'danger' })
    }
  }
   hidediv() {
    this.opentokService.gettoken(this.token);
     console.log(JSON.stringify(this.token));
    this.wel = !this.wel;
    this.enter = false;
    this.call = true;
    this.end = true;
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      this.session.on('streamCreated', (event) => {
        console.log(session);
        this.streams.push(event.stream);
        this.changeDetectorRef.detectChanges();
      });
      console.log('connnected to session');
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
  getSess() {
    return this.http.get('https://doctestapp.herokuapp.com/api/cats' +  name , {responseType: 'text'}).subscribe( data => {
      // console.log(data);
       this.callerName = data;
      // alert(this.token);
      console.log(this.callerName);
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
    this.callbut = !this.callbut;
    this.end = false;
    this.wel = !this.wel;
    this.call = !this.call;
  }

}
