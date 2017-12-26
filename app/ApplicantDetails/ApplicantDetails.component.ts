import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from "../ModelService/Job";
import { DbService } from "../DbService/DbService";
import { Manager } from "../ModelService/Manager";
import { Skill } from "../ModelService/Skill";
import { JobSkillset } from "../ModelService/JobSkillset";
import { JobRecruiter } from "../ModelService/JobRecruiter";
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Applicant } from "../ModelService/Applicant";
import { AuthService } from "../AuthService/Auth.Service";
import { Review } from "../ModelService/Review";
import { MailBuild } from "../ModelService/MailBuild";
@Component({
  selector: 'applicant-details',
  templateUrl: './ApplicantDetails.component.html',
  styleUrls: ['./ApplicantDetails.component.css']
})
export class ApplicantDetailsComponent implements OnInit {
  @Input() ChosenApplicant: Applicant;
  @Output() ApplicantDetailsAppearance = new EventEmitter<boolean>();

  constructor(private Service: DbService, private router: Router, private route: ActivatedRoute, public AuthService: AuthService) {
  }
  ngOnInit() {
    this.UserOn = localStorage.getItem("un");
  }
  review: Review = new Review();
  summaryMode: boolean = false;

  LockApplicant() {
    this.review.ManagerId = Number(localStorage.getItem('uid'));
    this.review.ApplicantId = this.ChosenApplicant.Id;
    let req = this.Service.post("Reviews", this.review);
    req.map(res => <any>res.json()).
      subscribe(res => {
        this.MailingApplicantAndRecruiters();
        this.ApplicantDetailsAppearance.emit(true);
      },
      (err: any) => {
      });
  }

  UserOn: string = "";

  closeCard() {
    this.ApplicantDetailsAppearance.emit(false);
  }

  ApplicantToView: Applicant = new Applicant("", "", 0, "", "");



  Mail: MailBuild = new MailBuild();

  PrepareMassage() {
    this.Mail.To = this.ChosenApplicant.Email;
    this.Mail.Subject = "Interview Invite - At&t";
    this.Mail.Body = "Hi " + this.ApplicantToView.Name + " You Invited To an Interview In Our Company ";
  }

  MailingApplicantAndRecruiters() {
    this.PrepareMassage()
    const req = this.Service.post("MailService", this.Mail);
    req.subscribe(res => { console.log("success 1") },
      (err: any) => {
      });

      this.ChosenApplicant.Recruiters.forEach(rec => {

    this.PrepareMassageToRecruiter(rec)
    const req = this.Service.post("MailService", this.Mail);
    req.subscribe(res => { console.log("success 2") },
      (err: any) => {
      });
    
  });
  }

  PrepareMassageToRecruiter(recruiter : Manager) {
    this.Mail.To = this.ChosenApplicant.Email;
    this.Mail.Subject = "Applicant Taken";
    this.Mail.Body = "Hi "  +recruiter.UserName+ " Your Applicant Locked By "+localStorage.getItem('un');
  }
}