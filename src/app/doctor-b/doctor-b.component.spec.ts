import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorBComponent } from './doctor-b.component';

describe('DoctorBComponent', () => {
  let component: DoctorBComponent;
  let fixture: ComponentFixture<DoctorBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
