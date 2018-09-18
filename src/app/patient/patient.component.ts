import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { OpentokService } from '../opentok.service';
import { HttpClient } from '@angular/common/http';
import * as OT from 'opentok-angular';
import {  RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [ OpentokService ]
})
export class PatientComponent implements OnInit {
  session: OT.Session;
  token = '123';
  streams: Array<OT.Stream> = [];
  wel = true;
  changeDetectorRef: ChangeDetectorRef;
  end = false;
  callername: string;
  config: any;
  call = false;
  onHold = false;
    subscriberOpts: {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
  constructor(private ref: ChangeDetectorRef, private http: HttpClient, private opentokService: OpentokService, private route: Router ) { }

  ngOnInit() {
    this.route.navigate(['./patient']);
    this.getCat();
    this.insertSess();
    this.getSess();
  }
  getCat() {
    return this.http.get('https://doctestapp.herokuapp.com/api/cat', {responseType: 'text'}).subscribe( data => {
      // console.log(data);
       this.token = data;
      // alert(this.token);
      console.log(this.token);
    });
  }
  insertSess() {
    this.callername = 'ali';
    return this.http.post('https://doctestapp.herokuapp.com/api/session', this.callername);
  }
  getSess() {
    return this.http.get('https://doctestapp.herokuapp.com/api/session', {responseType: 'text'} ).subscribe( data => {
        this.callername = JSON.stringify(data);
        alert(this.callername);
      }
    );
  }
  hidediv() {
     this.opentokService.gettoken(this.token);
     console.log(JSON.stringify(this.token));
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
   endcall() {
     this.session.disconnect();
     this.end = false;
     this.wel = !this.wel;
     this.call = !this.call;
   }
}
