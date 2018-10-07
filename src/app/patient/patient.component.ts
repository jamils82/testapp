import { Component, OnInit, ChangeDetectorRef , ElementRef, AfterViewInit, ViewChild, Input  } from '@angular/core';
import { OpentokService } from '../opentok.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import * as OT from 'opentok-angular';
import {  RouterModule, Routes, Router , ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import * as OT from '@opentok/client';
import { Observable } from 'rxjs';
const publish = () => {

};
export interface MyPatient {
  name: string;
  phone: string;
  activedoc: string;
}
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [ OpentokService ]
})
export class PatientComponent implements OnInit {
  socket;
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing: Boolean;
  token = '123';
  streams: Array<OT.Stream> = [];
  wel = true;
  sessconected = false;
  testname: any;
  changeDetectorRef: ChangeDetectorRef;
  end = false;
  callername: string;
  doctorconnected: any;
  onlineusers = [];
  favcaller: string;
  config: any;
  messages: any;
  call = false;
  messageText: any;
  public pat: MyPatient;
  onHold = false;
  room: any;
    subscriberOpts: {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
  connectionstream: any;
  pname: string;
  // tslint:disable-next-line:max-line-length
  constructor(private ref: ChangeDetectorRef,  public activatedRoute: ActivatedRoute,  private http: HttpClient, private opentokService: OpentokService, private route: Router ) {
    this.socket = io('https://doctestapp.herokuapp.com/');
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      // this.href = this.route.url;
      // alert(this.route.url);
      this.pname = params['name'];

     });
     this.callername = 'PatientA';
     this.socket = io.connect();

    // let's assume that the client page, once rendered, knows what room it wants to join
    this.messages = new Array();

    this.socket.on('message-received', (msg: any) => {
        this.messages.push(msg);
        console.log(msg);
        console.log(this.messages);
    });
    this.socket.emit('join-room', {room : this.pname } );
    this.socket.emit('add-user' , {username : this.callername } );
    console.log(this.pname);
    this.socket.emit('request-users', {});
    this.socket.on('users', (data) => {
      this.onlineusers = data.users;
    } );
    this.socket.on('add-users' , (data) => {
      this.onlineusers.push(data.username);
    } );
    this.socket.on('remove-users' , (data) => {
      this.onlineusers.splice(this.onlineusers.indexOf(data.username));
    } );
    this.socket.on('locationchangestate' , (e) => {
      this.socket.disconnect(true);
    } );
    this.getCat();
    setInterval(() => {
    this.getfav();
  }, 1000 );
  setInterval(() => {
    this.connectcall();
  }, 1000 );
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
  getSess(name: string ) {
    return this.http.get('https://doctestapp.herokuapp.com/api/cats/' +  this.callername ).subscribe( data => {
      //  this.callername = JSON.stringify(data );
      //  alert(this.callername);
      }
    );
  }
  setobj(name: string  , phone: string , activedoc: string) {
    return this.http.get('https://doctestapp.herokuapp.com/api/patobj' + name  );
  }
  sendMessage() {
    const message = {
    text: this.messageText
    };
    this.socket.emit('send-message', message);
     console.log(message.text);
    this.messageText = '';
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
      this.favcaller = data;
      console.log(this.favcaller);
    });
  }
  deletename(name: string) {
    this.callername = name;
    return this.http.get('https://doctestapp.herokuapp.com/api/session/' +  this.callername ).subscribe( data => {
     // this.callername = JSON.stringify(data );
    //  alert(this.callername);
    }
  );
  }
  onEnter(value: string) {
    this.callername = value;
   // this.hidediv(value);
  }
  hidediv(name: string , phone: string  ) {
    this.callername = name;
    const myph = phone;
    this.pat = {name: this.callername, phone : myph , activedoc : this.pname };
    alert(this.pat);
    this.setobj(this.callername , myph , this.pname );
    this.getSess(this.callername);
    this.wel = !this.wel;
    this.call = true;

    this.connectcall();
   }
   endcall() {
    this.deletename(this.callername);
    this.session.disconnect();
    this.callername = '';
    this.favcaller = '' ;
    this.end = false;
    this.wel = !this.wel;
    this.call = !this.call;
    this.route.navigate(['/doctor']);
   }
   connectcall() {
    if (this.callername) {
      console.log(this.callername);
      if ( this.favcaller ) {
        if (this.callername === this.favcaller ) {
          this.sessconected = true;
          this.end = true;
          console.log(this.callername , '&&%%%', this.favcaller );
          this.opentokService.initSession().then((session: OT.Session) => {
          this.session = session;
          this.session.on('streamCreated', (event) => {
            console.log(session);
            this.streams.push(event.stream);
            this.changeDetectorRef.detectChanges();
          });
          this.session.on('signal', (event) => {
            console.log('Signal sent from connection ' + event.from.connectionId);
            // Process the event.data property, if there is any data.
            alert(event.from.connectionId);
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
      } else {
        if (this.sessconected === true) {
          alert('Doctor disconnected.Please End the call');
          this.session.disconnect();
        }
      }
     } else {
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
