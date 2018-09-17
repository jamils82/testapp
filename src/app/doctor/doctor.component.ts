import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private route: Router ) { }

  ngOnInit() {
    this.route.navigateByUrl('/doctor');
  }
  doctor() {
    this.route.navigate(['/doctora']);
  }
  patient() {
    this.route.navigate(['/patient']);
  }

}
