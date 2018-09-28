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
  audioVideo: 'audioVideo';
  sessionId = '2_MX40NjE1MjQ1Mn5-MTUzNDUyNzk5MTY0NH5zenRtcm50WlpLSE4wNWtTQVZuUXYrSkZ-UH4';
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
    //  console.log(data);
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
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      this.session.on('streamCreated', (event) => {
        console.log(session);
        this.streams.push(event.stream);
        this.changeDetectorRef.detectChanges();
      });
      console.log('connnected to session');
      const ot = this.opentokService.getOT();
        this.pubdiv = document.getElementById('pubvideo');

        if (this.session) {
          if (this.session['isConnected']()) {
            if (this.publisher) {
              this.session.unpublish(this.publisher);
            }
            this.publisher = ot.initPublisher(this.pubdiv, {insertMode: 'append', width : '100%', height : '100%'});
            this.publish();
          }
          this.session.on('sessionConnected', () => this.publish());
      }
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
    this.session.unpublish(this.publisher);
    this.session.disconnect();
    this.list = !this.list;
    this.end = false;
    this.wel = !this.wel;
    this.call = !this.call;
  }

}
