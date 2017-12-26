import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { UpdateApplicantsComponent } from './update-applicants/update-applicants.component';
import { ApplicantsComponent } from "./applicants/applicants.component";
import { AddApplicantComponent } from './add-applicant/add-applicant.component';
import { AuthGuard } from './_guards/auth.guard';
import { ArchivesComponent } from './archives/archives.component';
import { RecruiterComponent } from "./recruiter/recruiter.component";
import { LoginAuthGuard } from "./_guards/login.guard";
import { InterviewSummeryComponent } from "./interview-summery/interview-summery.component";


const routes: Routes =[
    { path: 'register',        component: RegisterComponent  , canActivate : [AuthGuard] },
    { path: 'app-recruiter',component: RecruiterComponent, canActivate : [AuthGuard]  },
    { path: 'applicants',    component: ApplicantsComponent , canActivate : [AuthGuard]},
    { path: 'home',           component: HomeComponent , canActivate : [AuthGuard]  },
    { path: 'jobs',           component: JobsComponent , canActivate : [AuthGuard]  },
    { path: 'update-job',     component: UpdateJobComponent , canActivate : [AuthGuard]  },
    { path: 'update-applicants',component: UpdateApplicantsComponent , canActivate : [AuthGuard]  },
    { path: 'app-update-applicants',        component: UpdateApplicantsComponent , canActivate : [AuthGuard]  },    
    { path: 'login',        component: LoginComponent   , canActivate : [LoginAuthGuard]  },
    { path: 'add-applicant',        component: AddApplicantComponent , canActivate : [AuthGuard]  },
    { path: 'app-archives',        component: ArchivesComponent , canActivate : [AuthGuard]  },
    { path: 'app-interview-summery', component: InterviewSummeryComponent , canActivate : [AuthGuard]  },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }