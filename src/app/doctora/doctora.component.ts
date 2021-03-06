import { Component, OnInit, ChangeDetectorRef, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { OpentokService } from '.././opentok.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { RouterModule, Routes, Router } from '@angular/router';
import * as OT from 'opentok-angular';
import { cleanSession } from 'selenium-webdriver/safari';
import {MatListModule} from '@angular/material/list';
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

    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      if (this.session) {
        if (this.session['isConnected']()) {
          if (this.publisher) {
            this.session.unpublish(this.publisher);
          }

        }
        this.session.on('sessionConnected', () => this.publish());
    }
      this.session.on('streamCreated', (event) => {
        console.log(session);
        this.streams.push(event.stream);
        this.changeDetectorRef.detectChanges();
      });
      console.log('connnected to session');
      this.session.on('streamDestroyed', (event) => {
        event.preventDefault();
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
    this.session.unpublish(this.publisher);
    this.publisher = null;
    this.pubdiv = null;
    this.session.disconnect();
    this.list = !this.list;
    this.end = false;
    this.wel = !this.wel;
    this.call = !this.call;
  }

}
