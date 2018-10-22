import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpentokService } from './opentok.service';
import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as OT from 'opentok-angular';
import {DoctoraComponent} from './doctora/doctora.component';
import { appRoutes } from './routes';
import { cleanSession } from 'selenium-webdriver/safari';
export interface Cat {
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ OpentokService ]
})
export class AppComponent implements OnInit {
    url: any;
     // tslint:disable-next-line:max-line-length
     constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService, private http: HttpClient , private router: Router) {
   }

  ngOnInit () {
    this.router.events.subscribe( ()  => {
      this.url = this.router.url;
      if (this.url.match('/^#!/')) {
        this.router.navigate(
          this.url.replace('#', '')
        );
      }
    }
  );

   // this.getCat();
  // this.route.navigate(['/doctor']);
  }
}
