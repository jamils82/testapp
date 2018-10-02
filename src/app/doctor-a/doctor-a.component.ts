import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var OT: any;
@Component({
  selector: 'app-doctor-a',
  templateUrl: './doctor-a.component.html',
  styleUrls: ['./doctor-a.component.css']
})
export class DoctorAComponent implements OnInit {
  @ViewChild('subscriberDiv') subscriberDiv: ElementRef;
  session: any;
  publisher: any;
  subscriber: any;
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
    width: '100%',
    height: '100%'
};
subDiv: any;
vidFeedsDiv: any;
  constructor() { }

  ngOnInit() {
  }
  startCall() {
    this.session = OT.initSession(this.API_KEY, this.SESSION_ID);
     // Subscribe to a newly created stream
     /* this.session.on('streamCreated', (event) => {
        console.log(event);

      this.subscriber =  this.session.subscribe(event.stream, 'subscriber' , {
          insertMode: 'append',
          resolution: '1280x720',
          showControls: true,
          width: '100%',
          height: '100%'
        });

      });*/
      this.session.on('streamCreated', (event: any) => {
        let alreadySubscribed = false;
        this.subscribers = this.session.getSubscribersForStream(event.stream);
        for (this.sub of this.subscribers) {
            if (this.subscriber.stream.connection.connectionId === event.stream.connection.connectionId) {
                alreadySubscribed = true;
            }
        }
        if (!alreadySubscribed) {
           this.subDiv = document.createElement('div');
            this.subDiv.id = 'subscriberDiv_' + event.stream.connection.data;
            this.vidFeedsDiv = document.getElementById('subscriber');
            this.vidFeedsDiv.appendChild(this.subDiv);
             this.subscriber = this.session.subscribe(event.stream,
                this.subDiv.id,
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
      this.session.disconnect();

    }
}
