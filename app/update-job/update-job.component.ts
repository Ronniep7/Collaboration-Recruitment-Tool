import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from "../ModelService/Job";
import { DbService } from "../DbService/DbService";
import { Manager } from "../ModelService/Manager";
import { Skill } from "../ModelService/Skill";
import { JobSkillset } from "../ModelService/JobSkillset";
import { JobRecruiter } from "../ModelService/JobRecruiter";
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from "../notifications/notifications.component";
@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent implements OnInit {
  JobRecruiter: JobRecruiter[] = [];
  Skills: Skill[];
  Recruiters: Manager[];
  constructor(private Service: DbService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.GetSkills();
    this.GetRecruiters();
  }
  @Output() Appearance = new EventEmitter<boolean>();
  @Input() JobToUpdate: Job;

  SkillSet: JobSkillset[] = [];
  SkillPost() {
    this.JobToUpdate.Skills.forEach(element => {
      this.SkillSet.push(new JobSkillset(this.JobToUpdate.Id, element.Id));
    });
    const req = this.Service.EditCollection("jobSkillsets", this.SkillSet, this.JobToUpdate.Id);
    req.subscribe(res => {
    },
      (err: any) => {
      });
  }

  SkillRecruiterId() {
    this.JobToUpdate.Recruiters.forEach(element => {
      this.JobRecruiter.push(new JobRecruiter(this.JobToUpdate.Id, element.Id));
    });
    const req = this.Service.EditCollection("JobRecruiters", this.JobRecruiter, this.JobToUpdate.Id);
    req.subscribe(res => {
    },
      (err: any) => {
      });
  }

  CloseForm() {
    this.Appearance.emit(false);
  }

  PostJobToUpdate() {
    let req = this.Service.Edit("Jobs", this.JobToUpdate);
    req.subscribe(res => {
      this.SkillPost();
      this.SkillRecruiterId();
      this.Appearance.emit(true);
    }, (err) => {
    });
  }

  GetSkills() {
    let req = this.Service.Get("JobSkillsets")
    req.subscribe(rsp => {
      this.Skills = rsp.json();
    });
  }

  GetRecruiters() {
    let req = this.Service.Get("Managers")
    req.subscribe(rsp => {
      this.Recruiters = rsp.json();
    });
  }

  CheckSkill(skil: Skill) {

    if (this.JobToUpdate.Skills.find(Jskil => Jskil.Id == skil.Id))
      return true;
    else
      return false;
  }

  CheckRecruiter(Manager: Manager) {
    if (this.JobToUpdate.Recruiters.find(Jrec => Jrec.Id == Manager.Id))
      return true;
    else
      return false;
  }

  AddRecruiter(recruiter: Manager) {
    if (this.JobToUpdate.Recruiters.find(rec => rec.Id == recruiter.Id)) {
      let RecruiterIndex = this.JobToUpdate.Recruiters.findIndex(rec => rec.Id == recruiter.Id)
      this.JobToUpdate.Recruiters.splice(RecruiterIndex, 1);
    }
    else {
      this.JobToUpdate.Recruiters.push(recruiter);
    }
  }

  AddSkill(Skil: Skill) {
    if (this.JobToUpdate.Skills.find(Sk => Sk.Id == Skil.Id)) {
      let SkilIndex = this.JobToUpdate.Skills.findIndex(Sk => Sk.Id == Skil.Id);
      this.JobToUpdate.Skills.splice(SkilIndex, 1);
    }
    else {
      this.JobToUpdate.Skills.push(Skil);
    }
  }
}