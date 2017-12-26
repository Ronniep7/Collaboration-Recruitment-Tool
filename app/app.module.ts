import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { FireConfig } from "./FireConfig/FireConfig";
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UpdateApplicantsComponent } from "./update-applicants/update-applicants.component";
import { UpdateJobComponent } from './update-job/update-job.component';
import { JobsComponent } from './jobs/jobs.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BaseRequestOptions } from '@angular/http';
import { JobPostComponent } from "./job-post-try/job-post.component";
import { AuthGuard } from "./_guards/auth.guard";
import { DbService } from "./DbService/DbService";
import { ApplicantsComponent } from "./applicants/applicants.component";
import { AddApplicantComponent } from './add-applicant/add-applicant.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { UploadService } from './upload.service';
import { AngularFireAuth } from "angularfire2/auth";
import { NotificationsService } from '../app/notifications/notifications.component';
import { ArchivesComponent } from './archives/archives.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { FileDropDirective } from './file-drop.directive';
import { TabsModule } from 'ngx-tabs';
import { Ng2TableModule } from 'ngx-datatable';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2CompleterModule } from "ng2-completer";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ApplicantDetailsComponent } from "./ApplicantDetails/ApplicantDetails.component";
import { JobDetailsComponent } from "./JobDetails/JobDetails.component";
import { ArraySortPipe } from "./Pipes/sort.pipe";
import { LoginAuthGuard } from "./_guards/login.guard";
import { InterviewSummeryComponent } from "./interview-summery/interview-summery.component";
import { AdminAuthGuard } from "./_guards/administrator.guard";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApplicantsComponent,
    UpdateApplicantsComponent,
    UpdateJobComponent,
    JobsComponent,
    RegisterComponent,
    LoginComponent,
    JobPostComponent,
    AddApplicantComponent,
    ArchivesComponent,
    UploadFormComponent,
    FileDropDirective,
    RecruiterComponent,
    ApplicantDetailsComponent,
    JobDetailsComponent,
    InterviewSummeryComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FireConfig),
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule ,  
    TabsModule,
    NgxPaginationModule,
    Ng2TableModule,
    Ng2CompleterModule,
    Ng2SmartTableModule
  ],
  providers: [
    AuthGuard,
    DbService,
    UploadService,
    AngularFireAuth,
    AngularFireDatabase,
    NotificationsService,
    ArraySortPipe,
    LoginAuthGuard,
    AdminAuthGuard
    
],
  bootstrap: [AppComponent ],
  
})
export class AppModule  { 



}
