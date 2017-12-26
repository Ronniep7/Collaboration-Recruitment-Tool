import { Component, OnInit ,Output ,EventEmitter } from '@angular/core';
import { DbService } from "../DbService/DbService";
import { JobSkillset } from "../ModelService/JobSkillset";
import { JobRecruiter } from "../ModelService/JobRecruiter";
import { Job } from "../ModelService/Job";
import { ApplicantRecruiter } from "../ModelService/\u200F\u200FApplicantRecruiter";
import { ApplicantSkillset } from "../ModelService/\u200F\u200FApplicantSkillset";
import { Applicant } from "../ModelService/Applicant";
import { Skill } from '../ModelService/Skill';
import { Manager } from '../ModelService/Manager';
import { UploadService } from '../upload.service';
import { Upload } from '../Upload';
import * as _ from "lodash";
import { MailBuild } from "../ModelService/MailBuild";

@Component({
    selector: 'add-applicant',
    templateUrl: './add-applicant.component.html',
    styleUrls: ['./add-applicant.component.css'],
    providers: [DbService,UploadService]
})
export class AddApplicantComponent implements OnInit {

    constructor(private Service: DbService,private upSvc:UploadService) { }

    ngOnInit() {
        this.GetSkills();
        this.GetRecruiters();
    }

  @Output() Appearance = new EventEmitter<string>();
    currentUpload: Upload;
    dropzoneActive:boolean = false;
    Recruiuter: number[];
    SkillsetId: number[];
    SkillSet: ApplicantSkillset[] = [];
    JobRecruiter: ApplicantRecruiter[] = [];
    Skills: Skill[];
    Recruiters: Manager[];

    dropzoneState($event: boolean) {
        this.dropzoneActive = $event;
      }
      handleDrop(fileList: FileList) {
        let filesIndex = _.range(fileList.length)
        _.each(filesIndex, (idx) => {
          this.currentUpload = new Upload(fileList[idx]);
         this.upSvc.pushUpload(this.currentUpload);
      }   
        )
      }

    GetSkills() {
        let req = this.Service.Get("JobSkillsets")
        req.subscribe(rsp => {
            this.Skills = rsp.json();});}

    GetRecruiters() {
        let req = this.Service.Get("Managers")
        req.subscribe(rsp => {
            this.Recruiters = rsp.json();
        });
    }

 Applicant: Applicant = new Applicant("", "", 0, "", "");

    PostApplicant() {
        this.Applicant.Url = localStorage.getItem('DURL');   
        this.Applicant.LockedBy = "Almog";
        const req = this.Service.post("Applicants", this.Applicant);
        req.map(res => <any>res.json()).
            subscribe(res => {
                this.SkillPost(res);
                this.SkillRecruiterId(res);
                this.MailingRecruiters();
                this.Appearance.emit("success");
            },
            (err: any) => {
            });
    }

    SkillPost(appId: number) {
        this.Applicant.Skills.forEach(element => {
            this.SkillSet.push(new ApplicantSkillset(appId, element.Id));
        });
        const req = this.Service.post("ApplicantSkillsets", this.SkillSet);
        req.subscribe(res => {
        },
            (err: any) => {
            });
    }

    SkillRecruiterId(jobId: number) {
        this.Applicant.Recruiters.forEach(rec => {
            this.JobRecruiter.push(new ApplicantRecruiter(jobId, rec.Id));

        });
        const req = this.Service.post("ApplicantRecruiters", this.JobRecruiter);
        req.subscribe(res => {
        },
            (err: any) => {
            });
    }

   MailingRecruiters()
   {
    this.Applicant.Recruiters.forEach(rec => {
       this.PrepareMassage(rec)
       const req = this.Service.post("MailService", this.Mail);
        req.subscribe(res => { },
            (err: any) => {
            });
    });
   }

   Mail : MailBuild = new MailBuild();

   PrepareMassage( recruiter : Manager)
   {
    this.Mail.To = recruiter.Email;
    this.Mail.Subject = "New Applicant";
    this.Mail.Body = "Hi "+recruiter.UserName + " A new Applicant Attached To Your By "+localStorage.getItem('un')+" U better Check If He Worth The Aplicant Name Is "+this.Applicant.Name
   }

    AddRecruiter(recruiter: Manager) {
        if (this.Applicant.Recruiters.indexOf(recruiter) == -1) {
            this.Applicant.Recruiters.push(recruiter);
        }
        else {
            let RecruiterIndex = this.Applicant.Recruiters.indexOf(recruiter)
            this.Applicant.Recruiters.splice(RecruiterIndex, 1);
        }
    }

    AddSkill(Skil: Skill) {
        if (this.Applicant.Skills.indexOf(Skil) == -1) {
            this.Applicant.Skills.push(Skil);
        }
        else {
            let SkilIndex = this.Applicant.Skills.indexOf(Skil)
            this.Applicant.Skills.splice(SkilIndex, 1);
        }
    }

    CloseForm()
    {
        this.Appearance.emit("");
    }
}
