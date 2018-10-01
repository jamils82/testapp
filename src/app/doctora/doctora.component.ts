import { Component, OnInit, ChangeDetectorRef, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { OpentokService } from '.././opentok.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { RouterModule, Routes, Router } from '@angular/router';

import { cleanSession } from 'selenium-webdriver/safari';
import {MatListModule} from '@angular/material/list';
declare var OT: any;
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
  publisher: OT.Publisher;
  publishing: Boolean;
  closeResult: string;
  title = 'Angular Basic Video Chat';
  session: OT.Session;
  token: string;
  pubdiv: any;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  favcaller: string;
  wel = true;
  enter = true;
  end = false;
  call = false;
  callbut = true;
  onlinecallers: any = [];
  subscriberOpts: {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
  callerName = null;
  callerReason = null;
  list = true;
  doctorconnected = true;
  API_KEY = '46192222';
  SESSION_ID = '2_MX40NjE5MjIyMn5-MTUzNzY3ODk5MDc1N35pazVZWkVJeHlBc1ZBTE4xR2huUWFwbFp-fg';
  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  TOKEN = 'T1==cGFydG5lcl9pZD00NjE5MjIyMiZzaWc9YWZkZTgwY2RmZWY5MDFjYTZlMmFlZjY3MTdkNGJkZDEzNzEwNjU2MTpzZXNzaW9uX2lkPTJfTVg0ME5qRTVNakl5TW41LU1UVXpOelkzT0RrNU1EYzFOMzVwYXpWWldrVkplSGxCYzFaQlRFNHhSMmh1VVdGd2JGcC1mZyZjcmVhdGVfdGltZT0xNTM3Njc5MDE3Jm5vbmNlPTAuMjcyNTc0NzQ3NTQ4NzY2MSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQwMjcxMDE0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

  testname: string;
  // tslint:disable-next-line:max-line-length
  constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService, private http: HttpClient , private route: Router) {
    this.changeDetectorRef = ref;
  }

  ngOnInit () {
    this.route.navigate(['/doctora']);
    this.postconnect();
   setInterval(() => {
    this.getname().subscribe( data => {

    });
}, 3000);
  }
  getCat() {
    return this.http.get('https://doctestapp.herokuapp.com/api/cat', {responseType: 'text'}).subscribe( data => {
       this.token = data;
      console.log(this.token);
    });
  }
  postconnect() {
    return this.http.get('https://doctestapp.herokuapp.com/api/connecteddoctor/' +  this.doctorconnected ).subscribe( data => {
      }
    );
  }
  getname() {
    return this.http.get('https://doctestapp.herokuapp.com/api/sess' ).pipe(map(data => {
      this.onlinecallers = data;
      this.favcaller = this.onlinecallers[0];
      console.log(this.onlinecallers);
    }));
  }
  setfav (call: string) {
    this.favcaller = call;
    return this.http.get('https://doctestapp.herokuapp.com/api/favcaller/' + this.favcaller).subscribe( data => {
      console.log(this.favcaller);
    });
  }
  errorHandler(err) {
    if (err && err.message) {
     console.log(err);
     }
  }
   hidediv(i: string ) {
    this.favcaller = this.onlinecallers[i];
    this.setfav(this.favcaller);
    this.opentokService.gettoken(this.token);
    this.wel = !this.wel;
    this.list = !this.list;
    this.enter = false;
    this.call = true;
    this.end = true;
    const ot = this.opentokService.getOT();
    this.pubdiv = document.getElementById('pubdiv');
    this.session = OT.initSession(this.API_KEY , this.SESSION_ID);
    this.session.on('streamCreated', (event) => {
    this.session.subscribe(event.stream, 'subscriber',
     {insertMode: 'append',
        showControls: true,
        width: '100%',
        height: '100%'
      });
    });

    this.session.on('sessionDisconnected', (event) => {

    });
    // Connect to the session
    this.session.connect(this.TOKEN, (error) => {
      if (!error) {
        // Create a publisher
        this.publisher = OT.initPublisher('publisher', { insertMode: 'append',
            resolution: '1280x720',
            width: '100%',
            height: '100%'
          });
          }
        });
          this.session.publish(this.publisher, (error) => {
            if (error) {
              console.log('Publisher error: ' + error);
            }
          });
  }
  publish() {
    this.session.publish(this.publisher, (err) => {
      if (err) {
        alert(err.message);
      } else {
        this.publishing = true;
      }
    });
  }
  getSess() {
    return this.http.get('https://doctestapp.herokuapp.com/api/cats' + name , {responseType: 'text'}).subscribe( data => {
       this.callerName = data;
       console.log(this.callerName);
  });
  }
  endcall() {
    this.publisher = null;
    this.session.disconnect();
    this.list = !this.list;
    this.end = false;
    this.wel = !this.wel;
    this.call = !this.call;
  }

}
