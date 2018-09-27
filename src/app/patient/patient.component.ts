import { Component, OnInit, ChangeDetectorRef , ElementRef, AfterViewInit, ViewChild, Input  } from '@angular/core';
import { OpentokService } from '../opentok.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import * as OT from 'opentok-angular';
import {  RouterModule, Routes, Router } from '@angular/router';
import * as OT from 'opentok-angular';
const publish = () => {

};


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [ OpentokService ]
})
export class PatientComponent implements OnInit {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing: Boolean;
  token = '123';
  streams: Array<OT.Stream> = [];
  wel = true;
  testname: any;
  changeDetectorRef: ChangeDetectorRef;
  end = false;
  callername: string;
  doctorconnected: any;
  favcaller: string;
  config: any;
  call = false;
  onHold = false;
    subscriberOpts: {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
  connectionstream: any;
  constructor(private ref: ChangeDetectorRef, private http: HttpClient, private opentokService: OpentokService, private route: Router ) { }

  ngOnInit() {
    this.route.navigate(['./patient']);
    this.getCat();
    setInterval(() => {
    this.getfav();
  }, 3000 );
  setInterval(() => {
    this.connectcall();
  }, 3000 );
   // this.insertSess();
  //  this.getSess();
  }
  getCat() {
    return this.http.get('https://doctestapp.herokuapp.com/api/pattok', {responseType: 'text'}).subscribe( data => {
      // console.log(data);
       this.token = data;
      // alert(this.token);
      console.log(this.token);
    });
  }
  insertSess() {
   // return this.http.put('https://doctestapp.herokuapp.com/api/session' , 'saad');
    return this.http.post('https://doctestapp.herokuapp.com/api/cats' ,  {name : this.callername}).subscribe( data  => {
       this.testname = data;
       console.log(this.testname);
    });
  }
  getSess(name: string) {
    return this.http.get('https://doctestapp.herokuapp.com/api/cats/' +  this.callername ).subscribe( data => {
        this.callername = JSON.stringify(data );
      //  alert(this.callername);
      }
    );
  }
  getDoc() {
    return this.http.get('https://doctestapp.herokuapp.com/api/connecteddoctor' ).subscribe( data => {
        this.doctorconnected = data;
        console.log(this.doctorconnected);
      //  alert(this.callername);
      }
    );
  }
  getname() {
    return this.http.get('https://doctestapp.herokuapp.com/api/sess' , {responseType: 'text'} ).subscribe( data => {
      this.testname = data;
      alert(this.testname);
    } );
  }
  getfav() {
    return this.http.get('https://doctestapp.herokuapp.com/api/getfavcaller', {responseType: 'text'} ).subscribe( data => {
    //  this.favcaller = data;
      console.log(this.favcaller);
    });
  }
  deletename() {
    return this.http.get('https://doctestapp.herokuapp.com/api/session/' +  this.callername ).subscribe( data => {
     // this.callername = JSON.stringify(data );
    //  alert(this.callername);
    }
  );
  }
  onEnter(value: string) {
    this.callername = value;
    this.hidediv(value);
  // alert(this.callername);
  }
  hidediv(box: string ) {
    this.callername = box;
    this.getSess(this.callername);
    this.wel = !this.wel;
    this.call = true;
    this.end = true;
    this.connectcall();
   }
   endcall() {
    this.deletename();
    this.session.disconnect();
    this.end = false;
    this.wel = !this.wel;
    this.call = !this.call;
   }
   connectcall() {
    if (typeof this.callername !== undefined ) {
      console.log(this.callername);
      if ( typeof this.favcaller !== undefined ) {
        if (this.callername === this.favcaller ) {
        console.log(this.callername , '&&%%%', this.favcaller );
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
      } } else {
        console.log('looking');
      }
   }
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
}
