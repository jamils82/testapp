import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { RouterModule, Routes, ActivatedRoute, Params, Router } from '@angular/router';
import * as io from 'socket.io-client';
declare var OT: any;
@Component({
  selector: 'app-doctor-a',
  templateUrl: './doctor-a.component.html',
  styleUrls: ['./doctor-a.component.css']
})
export class DoctorAComponent implements OnInit {
  @HostListener('window:unload', ['$event'])
  @ViewChild('subscriberDiv') subscriberDiv: ElementRef;
  session: any;
  socket ;
  publisher: any;
  public href: string;
  subscriber: any;
  vid = false;
  cameraSource = 0;
  devices: any[];
  streams: Array<OT.Stream> = [];
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
    subDiv: any;
    doctorconnected = true;
    favcaller: string;
    wel = true;
    enter = true;
    end = false;
    call = false;
    callbut = true;
    onlinecallers: any = [];
    vidFeedsDiv: any;
    list = true;
     userId: any;
  room: any;
  Username: string;
  constructor( private http: HttpClient , private route: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.socket = io.connect('https://doctestapp.herokuapp.com');

      this.activatedRoute.params.subscribe((params) => {
     // this.href = this.route.url;
     // alert(this.route.url);
      this.room = params['name'];
      // alert(this.userId);
    });
    if (this.room  === 'DoctorA' ) {
      this.SESSION_ID = '1_MX40NjE5MjIyMn5-MTUzOTY4MTg0Mzc5N35NZDRqazJxTmZWRzB6dXVvbVlCVTlYbUt-fg';
      alert(this.SESSION_ID);
      // tslint:disable-next-line:max-line-length
      this.TOKEN = 'T1==cGFydG5lcl9pZD00NjE5MjIyMiZzaWc9ZWM5ZWQ3YzgyMWE1NTBjYWNiMGUwM2E4NjY1MTIzNjgxNjBhNDAxYTpzZXNzaW9uX2lkPTFfTVg0ME5qRTVNakl5TW41LU1UVXpPVFk0TVRnME16YzVOMzVOWkRScWF6SnhUbVpXUnpCNmRYVnZiVmxDVlRsWWJVdC1mZyZjcmVhdGVfdGltZT0xNTM5NjgxODU0Jm5vbmNlPTAuMzA0MzA2NzAzNzcyMTAxMjMmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU0MjI3NzQ0OSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';
     } else if (this.room  === 'DoctorB' ) {
      this.SESSION_ID = '1_MX40NjE5MjIyMn5-MTUzOTY4MjA1Mzc0OX5LT2JmYktHM0E2VVBiaDhqNnBwOHVTaUx-fg';
      // tslint:disable-next-line:max-line-length
      this.TOKEN = 'T1==cGFydG5lcl9pZD00NjE5MjIyMiZzaWc9OGE1YTg3N2Y4Mjk3Nzk0MTMwOTcxZGYyNjY4NjE0YjU4OTY5OTU2YTpzZXNzaW9uX2lkPTFfTVg0ME5qRTVNakl5TW41LU1UVXpPVFk0TWpBMU16YzBPWDVMVDJKbVlrdEhNMEUyVlZCaWFEaHFObkJ3T0hWVGFVeC1mZyZjcmVhdGVfdGltZT0xNTM5NjgyMDc3Jm5vbmNlPTAuNzc5NjE1NTE1NjE1NTY5MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQyMjc3NjcyJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
     } else if (this.room  === 'DoctorC' ) {
      this.SESSION_ID = '1_MX40NjE5MjIyMn5-MTUzOTY4MjEyMTk1Nn5ldTh2TElyaXV3NW1RR0pFTW91RFBnZSt-fg';
      // tslint:disable-next-line:max-line-length
      this.TOKEN = 'T1==cGFydG5lcl9pZD00NjE5MjIyMiZzaWc9NTM4ZjZhZjBlY2Q2NWQ3YTUxZjFmYWQyYmI0NWFlYjFmNGYyM2MxMTpzZXNzaW9uX2lkPTFfTVg0ME5qRTVNakl5TW41LU1UVXpPVFk0TWpFeU1UazFObjVsZFRoMlRFbHlhWFYzTlcxUlIwcEZUVzkxUkZCblpTdC1mZyZjcmVhdGVfdGltZT0xNTM5NjgyMTU2Jm5vbmNlPTAuMDM5ODA5MjU3NTkwNjEyMzgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU0MjI3Nzc1MCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';
     } else if (this.room  === 'Saad' ) {
      this.SESSION_ID = '2_MX40NjE5MjIyMn5-MTUzOTY4MjE3MTc0Mn5VVnlEeXNXN3dFZ0NwZjdyRFdEeTJ3VVp-fg';
      // tslint:disable-next-line:max-line-length
      this.TOKEN = 'T1==cGFydG5lcl9pZD00NjE5MjIyMiZzaWc9NDQ3ZGUyZTUxZTAwNmEwMjM5NmEyMDUzYTQwOWQyYTVlMWQ5YzE2ZDpzZXNzaW9uX2lkPTJfTVg0ME5qRTVNakl5TW41LU1UVXpPVFk0TWpFM01UYzBNbjVWVm5sRWVYTlhOM2RGWjBOd1pqZHlSRmRFZVRKM1ZWcC1mZyZjcmVhdGVfdGltZT0xNTM5NjgyMTg2Jm5vbmNlPTAuMzIwNDI4OTkwNTUxMzE0NDYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU0MjI3Nzc4MCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';
     }
    this.sendroom(this.room);
    this.senduser('');
    this.sendMessage('');
     setInterval( () => {
       this.sendMessage('');
     } , 7000 );
    this.postconnect();

   /* setInterval(() => {
      this.getpatobj();
    }, 1000); */
  }


  postconnect() {
    return this.http.get('https://doctestapp.herokuapp.com/api/connecteddoctor/' +  this.doctorconnected ).subscribe( data => {
      }
    );
  }
  getpatobj() {
    return this.http.get('https://doctestapp.herokuapp.com/api/docobj/' + this.session ).subscribe( data => {
      console.log( data );
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
   startCall(i: string) {
    this.favcaller = this.onlinecallers[i];
    this.setfav(this.favcaller);
  //  alert(this.favcaller);
    this.wel = !this.wel;
    this.vid = true;
    this.list = !this.list;
    this.enter = false;
    this.call = true;
    this.end = true;
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
                'subscriber',
                this.subscriberProperties,
                (error: any) => {
                    if (error) {
                        console.log(error);
                    } else {
                    }
                }
            );
        }
    });
      this.session.on('sessionDisconnected', (event) => {
        this.session.unsubscribe(event.stream);

      }
      );
      this.session.on('streamDestroyed', (event) => {
        this.session.unsubscribe(event.stream);
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
    }
    // Ends call
    endCall() {
      this.vid = false;
      this.session.disconnect();
      this.list = !this.list;
      this.end = false;
      this.wel = !this.wel;
      this.call = !this.call;
    }
    sendroom(room: string ) {
      this.room = room;
      this.socket.emit('sendroom' , this.room );

     }

    senduser( name: string ) {
      this.Username = name;
      this.socket.emit('add-user', this.Username );
      this.socket.on('userExists', function(data) {
        document.getElementById('error-container').innerHTML = data;
     });

    }
    sendMessage(  mymsg: string ) {
     /* this.socket.on('user joined' , function(userName , numUsers) {
        console.log(userName);
        console.log(numUsers);
      } );
     */
     this.socket.emit('showusers' , this.room );
     // console.log('works');
      this.socket.on('getlist', (data) => {
        this.onlinecallers =  data;
        console.log(this.onlinecallers);
      //  alert(data);

      });
    }
}
