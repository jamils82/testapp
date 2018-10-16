import { Component, OnInit, ChangeDetectorRef , ElementRef, AfterViewInit, ViewChild, Input , HostListener } from '@angular/core';
import { OpentokService } from '../opentok.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import * as OT from 'opentok-angular';
import {  RouterModule, Routes, Router , ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
declare var OT: any;

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
  @HostListener('window:unload', ['$event'])
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
  API_KEY = '46192222';
  SESSION_ID = '2_MX40NjE5MjIyMn5-MTUzNzY3ODk5MDc1N35pazVZWkVJeHlBc1ZBTE4xR2huUWFwbFp-fg';
  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  TOKEN = 'T1==cGFydG5lcl9pZD00NjE5MjIyMiZzaWc9YWZkZTgwY2RmZWY5MDFjYTZlMmFlZjY3MTdkNGJkZDEzNzEwNjU2MTpzZXNzaW9uX2lkPTJfTVg0ME5qRTVNakl5TW41LU1UVXpOelkzT0RrNU1EYzFOMzVwYXpWWldrVkplSGxCYzFaQlRFNHhSMmh1VVdGd2JGcC1mZyZjcmVhdGVfdGltZT0xNTM3Njc5MDE3Jm5vbmNlPTAuMjcyNTc0NzQ3NTQ4NzY2MSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQwMjcxMDE0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
  subscribers: any;
  sub: any;
   subscriberProperties = {
    insertMode: 'append',
    resolution: '1280x720',
    showControls: true,
    width: '100%',
    height: '100%'
};
  subscriber: any;
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
    this.socket = io.connect('https://doctestapp.herokuapp.com');
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      // this.href = this.route.url;
      // alert(this.route.url);
      this.room = params['name'];
    // alert(this.room);
     });

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
  setUsername() {
   this.socket.emit('setUsername', this.callername );
 }

  onEnter(value: string) {
    this.callername = value;
   // this.hidediv(value);
  }

  sendroom(room: string ) {
    this.room = room;
    this.socket.emit('sendroom' , this.room );

   }

  senduser(  ) {
    this.socket.emit('add-user', this.callername );


  }
  endsock() {
    this.socket.emit('disconnect' , this.callername );
  }
  beforeunloadHandler(event) {
    this.endsock();
  }

  hidediv(name: string , phone: string  ) {
    this.callername = name;
    const myph = phone;
    this.socket.emit('sendroom' , this.room );
    this.socket.emit('add-user', this.callername );
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
          this.session = OT.initSession(this.API_KEY, this.SESSION_ID);
          this.session.on('streamCreated', (event: any) => {
            let alreadySubscribed = false;
            this.subscribers = this.session.getSubscribersForStream(event.stream);
            for (this.sub of this.subscribers) {
                if (this.subscriber.stream.connection.connectionId === event.stream.connection.connectionId) {
                    alreadySubscribed = true;
                }
            }
            if (!alreadySubscribed) {
                this.subscriber = this.session.subscribe(event.stream,
                    'subscriber',  {
                      insertMode: 'append',
                      showControls: true,
                      width: '100%',
                      height: '100%'
                  } ,
                    (error: any) => {
                        if (error) {
                            console.log(error);
                        } else {
                        }
                    }
                );
            }
        });
          // Connect to the session
          this.session.connect(this.TOKEN, (error) => {
            if (!error) {
              // Create a publisher
              this.publisher = OT.initPublisher('publisher', {
                insertMode: 'append',
                resolution: '1280x720',
                width: '100%',
                height: '100%'
                });
                this.session.publish(this.publisher, (e) => {
                  if (e) {
                    console.log('Publisher error: ' + error);
                  }
                });
            } else {
              alert('There was an error connecting to the session' + error.message);
            }
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
