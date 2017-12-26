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
@Component({
  selector: 'Job-details',
  templateUrl: './JobDetails.component.html',
  styleUrls: ['./JobDetails.component.css']
})
export class JobDetailsComponent implements OnInit {

  constructor(private Service: DbService, private router: Router, private route: ActivatedRoute, public AuthService: AuthService) { }

  UserOn: string = "";
  ngOnInit() {
    this.UserOn = localStorage.getItem("un");
  }

  @Input() ChosenJob: Applicant;
  @Output() JobDetailsAppearance = new EventEmitter<boolean>();

  CloseCard() {
    this.JobDetailsAppearance.emit(false);
    this.ngOnInit();
  }
}