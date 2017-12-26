import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Upload } from "../upload";
import { DbService } from "../DbService/DbService";
import { UploadService } from "../upload.service";
import { Applicant } from "../ModelService/Applicant";
import { Skill } from "../ModelService/Skill";
import { Manager } from "../ModelService/Manager";
import { ApplicantRecruiter } from "../ModelService/\u200F\u200FApplicantRecruiter";
import { Review } from "../ModelService/Review";
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../AuthService/Auth.Service";

@Component({
  selector: 'app-interview-summery',
  templateUrl: './interview-summery.component.html',
  styleUrls: ['./interview-summery.component.css']
})
export class InterviewSummeryComponent implements OnInit {
  lock: boolean;
  review: Review = new Review();

  constructor(private Service: DbService, private router: Router, private route: ActivatedRoute, public AuthService: AuthService) {

  }

  @Input() Applicant: Applicant;
  @Output() Appearance = new EventEmitter<string>();
  AppRecruiter: ApplicantRecruiter[] = [];

  ngOnInit() {
    this.review.ManagerId = Number.parseInt(localStorage.getItem('uid'));
    this.review.ApplicantId = this.Applicant.Id;
    this.review.Status = '';
  }

  closeForm() {
    this.Appearance.emit("");
  }

  StatusError: boolean = false;

  PostSummary() {
    if (this.review.Status == "")
      this.StatusError = true
    else {
      const req = this.Service.Edit("Reviews", this.review);
      req.map(res => <any>res.json()).
        subscribe(res => {
          this.Appearance.emit("success");
        },
        (err: any) => {
        });
    }
  }
}