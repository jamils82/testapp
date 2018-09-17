import { Component, OnInit } from '@angular/core';

import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-doctorb',
  templateUrl: './doctorb.component.html',
  styleUrls: ['./doctorb.component.css']
})
export class DoctorbComponent implements OnInit {

  constructor(private route: Router ) { }

  ngOnInit() {
    this.route.navigate(['./doctorb']);
  }

}
