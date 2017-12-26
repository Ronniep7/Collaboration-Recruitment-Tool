import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DbService } from "../DbService/DbService";
import { JobSkillset } from "../ModelService/JobSkillset";
import { JobRecruiter } from "../ModelService/JobRecruiter";
import { Job } from "../ModelService/Job";
import { Skill } from "../ModelService/Skill";
import { Manager } from "../ModelService/Manager";
import { NotificationsService } from '../notifications/notifications.component';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css'],
  providers: [DbService]
})
export class JobPostComponent implements OnInit {

  constructor(private Service: DbService, private Notify: NotificationsService) { }

  ngOnInit() {
    this.GetSkills();
    this.GetRecruiters()
  }

  @Output() Appearance = new EventEmitter<string>();

  SkillSet: JobSkillset[] = [];
  JobRecruiter: JobRecruiter[] = [];
  Skills: Skill[];
  Recruiters: Manager[];
  NewJob: Job = new Job("", "", "");

  PostNewJob() {
    let req = this.Service.post("Jobs", this.NewJob);
    req.map(res => <any>res.json()).
      subscribe(res => {
        if (this.NewJob.Skills != [])
          this.SkillPost(res);
        if (this.NewJob.Recruiters != [])
          this.SkillRecruiterId(res);
        this.Appearance.emit("success");
      },
      (err: any) => {
        this.Notify.showNotification('bottom', 'right', 'Error in posting the job', 4);
      });
  }

  CloseForm()
  {
    this.Appearance.emit("");   
  }

  SkillPost(jobId: number) {
    this.NewJob.Skills.forEach(element => {
      this.SkillSet.push(new JobSkillset(jobId, element.Id));
    });
    const req = this.Service.post("jobSkillsets", this.SkillSet);
    req.subscribe(res => {
    },
      (err: any) => {
      });
  }

  SkillRecruiterId(jobId: number) {
    this.NewJob.Recruiters.forEach(element => {
      this.JobRecruiter.push(new JobRecruiter(jobId, element.Id));
    });
    const req = this.Service.post("JobRecruiters", this.JobRecruiter);
    req.subscribe(res => {
    },
      (err: any) => {
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

  AddRecruiter(recruiter: Manager) {
    if (this.NewJob.Recruiters.indexOf(recruiter) == -1) {
      this.NewJob.Recruiters.push(recruiter);
    }
    else {
      let RecruiterIndex = this.NewJob.Recruiters.indexOf(recruiter)
      this.NewJob.Recruiters.splice(RecruiterIndex, 1);
    }
  }

  AddSkill(Skil: Skill) {
    if (this.NewJob.Skills.indexOf(Skil) == -1) {
      this.NewJob.Skills.push(Skil);
    }
    else {
      let SkilIndex = this.NewJob.Skills.indexOf(Skil)
      this.NewJob.Skills.splice(SkilIndex, 1);
    }
  }
}