import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAComponent } from './doctor-a.component';

describe('DoctorAComponent', () => {
  let component: DoctorAComponent;
  let fixture: ComponentFixture<DoctorAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
