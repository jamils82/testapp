import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { OpentokService } from '../opentok.service';

const publish = () => {

};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})

export class PublisherComponent implements AfterViewInit {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing: Boolean;

  constructor(private opentokService: OpentokService) {
    this.publishing = true;
  }

  ngAfterViewInit() {
    const OT = this.opentokService.getOT();
    if (this.publisher) {
      this.session.unpublish(this.publisher);
    } else {
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {insertMode: 'append', width : '100%', height : '100%'});

    if (this.session) {
      if (this.session['isConnected']()) {
        if (this.publisher) {
          this.session.unpublish(this.publisher);
        }
        this.publish();
      }
      this.session.on('sessionConnected', () => this.publish());
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
