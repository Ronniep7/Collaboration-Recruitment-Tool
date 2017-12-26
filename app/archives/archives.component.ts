import { Component, OnInit } from '@angular/core';
import { DbService } from ".././DbService/DbService";
import { Applicant } from "../ModelService/Applicant"
import { NotificationsService } from '../notifications/notifications.component';
import { AuthService } from "app/AuthService/Auth.Service";
import { Job } from "../ModelService/Job";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {
  p: number;
  AllApplicants: Applicant [] = [];  
  Jobs: Job [] =[];
  AddJob = false;
  Skills = ["", "", ""];
  EditMode: boolean = false;
  ngOnInit() {
    this.GetApplicants();
    this.GetJobs();
  }
  settingsApp = {
    mode: 'inline',
    selectMode: 'single', 
    hideHeader: false,
    hideSubHeader: true,

    actions: {
      delete: false,
      add: false,
      edit: false
    },
    pager: {
      display: true,
      perPage: 7,
    },
    columns: {

      Name: {
        title: 'Name',
        filter: true
      },
      Email: {
        title: 'Email',
        filter: true
      },
      Phone: {
        title: 'Phone',
        filter: true
      },
      Title: {
        title: 'Title',
        filter: true
      },
      Experience: {
        title: 'Experience',
        filter: true
      },
    },
  };
  settingsJob = {
    mode: 'inline', 
    selectMode: 'single', 
    hideHeader: false,
    hideSubHeader: true,

    actions: {
      delete: false,
      add: false,
      edit: false
    },
    pager: {
      display: true,
      perPage: 7,
    },
    columns: {
      Title: {
        title: 'Title',
        filter: true
      },

      Experience: {
        title: 'Experience',
        filter: true
      },
      Position: {
        title: 'Position',
        filter: true
      },

    },
  };

  constructor(private Service: DbService, private Notify: NotificationsService, public AuthService: AuthService) { }
  GetApplicants() {
    let req = this.Service.Get("Applicants")
    req.subscribe(rsp => {
      this.AllApplicants = rsp.json().filter(app=> app.Active == false);
      console.log("this.AllApplicants ", this.AllApplicants);
    });
  }
  OnAppearance(CloseForm: string) {
    if (CloseForm == 'success')
      this.Notify.showNotification('top', 'right', 'Aplicant Update Succesfully', 2);
  }
  GetJobs() {
    this.Skills = [];
    let req = this.Service.Get("Jobs")
    req.subscribe(rsp => {
      this.Jobs = rsp.json().filter(job => job.Published == false);
      console.log("this.Jobs ", this.Jobs);
      
    });
  }
}
