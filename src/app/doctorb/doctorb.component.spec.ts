import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorbComponent } from './doctorb.component';

describe('DoctorbComponent', () => {
  let component: DoctorbComponent;
  let fixture: ComponentFixture<DoctorbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
