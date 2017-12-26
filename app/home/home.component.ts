import { Component, OnInit } from '@angular/core';
import { AuthService } from "../AuthService/Auth.Service";
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from "../notifications/notifications.component";
import { Job } from "../ModelService/Job";
import { DbService } from "../DbService/DbService";
import { Applicant } from "../ModelService/Applicant";

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public AuthService: AuthService, private Notify: NotificationsService, private route: ActivatedRoute, private Service: DbService) {
  }
  currentUser: string = "";
  currentUserId: number = null;
  attachedApplicant: string[];
  LockedApplicant: Applicant[] = [];
  ApplicantToSummary: Applicant;
  SummaryMode: boolean = false;
  AfterInterview: Date = new Date();

  LockedApplicantLenght : number = 0;
  ngOnInit() {
    this.AfterInterview = new Date();
    if (localStorage.getItem('AfterLogin'))
      this.Notify.showNotification('top', 'right', 'You have logged successfully', 2);

    setTimeout(() => {
      localStorage.removeItem('AfterLogin')
    }, 3000);
    this.currentUser = localStorage.getItem("un");
    this.getLockedUsers();
  }

  getLockedUsers() {
    let req = this.Service.Get("Reviews");
    req.subscribe(rsp => {
      this.LockedApplicant = rsp.json();
      this.LockedApplicantLenght = this.LockedApplicant.length;
    });
  }

  ToSummary(applicant: Applicant) {
    this.ApplicantToSummary = applicant;
    this.SummaryMode = true;
  }

  onAppearance(actionMode: string) {
    this.SummaryMode = false;
    if (actionMode == "success")
      this.Notify.showNotification('top', 'right', 'Summary Posted successfull', 2);
    this.ngOnInit();
  }
}
