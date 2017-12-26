import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApplicantsComponent } from "./update-applicants.component";

describe('UpdateApplicantsComponent', () => {
  let component: UpdateApplicantsComponent;
  let fixture: ComponentFixture<UpdateApplicantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateApplicantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
