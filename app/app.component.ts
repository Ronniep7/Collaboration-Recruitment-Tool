import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AuthService } from "./AuthService/Auth.Service";

declare const $: any;

@Component({
  moduleId: module.id,  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [AuthService]
})
export class AppComponent implements OnInit {

  constructor(public location: Location , public AuthService : AuthService) {
          this.AuthService.IsLogged; 
  }

  ngOnInit() {
      $.material.options.autofill = true;
      $.material.init();
      this.AuthService.AuthState();
  }

    isMaps(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
        return false;
      }
      else {
        return true;
      }
    }
}
