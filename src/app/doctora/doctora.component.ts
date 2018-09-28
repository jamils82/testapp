import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpentokService } from '.././opentok.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { RouterModule, Routes, Router } from '@angular/router';
// import * as OT from 'opentok-angular';
import config from '../../config';
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
})
export class DoctoraComponent implements OnInit {
  pubdiv: any;
  closeResult: string;
  publisher: OT.Publisher;
  publishing: Boolean;
  title = 'Angular Basic Video Chat';
  session: OT.Session;
  token: string;
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
  audioVideo: 'audioVideo';
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
   // this.getCat();
   setInterval(() => {
    this.getname().subscribe( data => {
   //   this.onlinecallers = JSON.stringify(data);
      console.log(data);
    });
}, 3000);
  //  this.getSess();
  //  this.getname();
   // this.hidediv();
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
  postconnect() {
    return this.http.get('https://doctestapp.herokuapp.com/api/connecteddoctor/' +  this.doctorconnected ).subscribe( data => {
        // this.doctorconnected = (data );
      //  alert(this.callername);
      }
    );
  }
  getname() {
    return this.http.get('https://doctestapp.herokuapp.com/api/sess' ).pipe(map(data => {
      this.onlinecallers = data;
      this.favcaller = this.onlinecallers[0];
    //  this.callerName = JSON.stringify(this.callerName);
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
      // UIkit.notification(err.message, { pos: 'bottom-left', status: 'danger' })
    }
  }
   hidediv(i: string ) {
    // alert(i);
    // alert(this.onlinecallers[i]);
    this.favcaller = this.onlinecallers[i];
    this.setfav(this.favcaller);
    this.opentokService.gettoken(this.token);
    // console.log(JSON.stringify(this.token));
    this.wel = !this.wel;
    this.list = !this.list;
    this.enter = false;
    this.call = true;
    this.end = true;
     this.session = OT.initSession(this.API_KEY , this.SESSION_ID);
      this.session.connect(this.TOKEN, (error) => {
      if (!error) {
      this.pubdiv = document.getElementById('publisherdiv');
      this.publisher = OT.initPublisher(this.pubdiv, {insertMode: 'append', width : '100%', height : '100%'});
      this.publish();
      }});
      this.session.on('sessionConnected', () => this.publish());
    //  console.log('Token ID ' , this.token);
     this.session.on('streamCreated', (event) => {
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
    this.session.unpublish(this.publisher);
    this.list = !this.list;
    this.end = false;
    this.wel = !this.wel;
    this.call = !this.call;
  }

}
