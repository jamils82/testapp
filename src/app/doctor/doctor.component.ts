import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  userId: string;
  public href: string;
  constructor(private route: Router , private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
    /*  this.href = this.route.url;
      alert(this.route.url); */
      this.userId = params['name'];
      if ( this.userId ) {
        if (this.userId === 'DoctorA' ) {
        } else if (this.userId === 'DoctorB' ) {
        } else if (this.userId === 'DoctorC' ) {
        } else if (this.userId === 'DoctorD') {
        } else if (this.userId === 'saad') {
        } else {
          this.route.navigate(['pagenotfound']);
        }
      } else {
        this.route.navigate(['pagenotfound']);
     }
    });
  }
  doctor() {
    this.route.navigate(['/mydoctor', this.userId ]);
  }
  patient() {
    this.route.navigate(['/patient', this.userId]);
  }

}
