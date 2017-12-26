import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from "../DbService/DbService";
import { AuthService } from "../AuthService/Auth.Service";

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DbService, AuthService]
})

export class LoginComponent implements OnInit {
  model: any = {};

  ErrorMess : string = "" ;
  
  constructor(private route: ActivatedRoute, private router: Router,
    private Service: DbService, private AuthService: AuthService) { }

  ngOnInit() { }

  Login() {
    const req = this.Service.login("ManagerLogins", this.model);
    req.map(res => <any>res.json()).
      subscribe(res => {
        window.location.replace('/home');
        localStorage.setItem('Session', res.SessionId);
        localStorage.setItem('ue', res.ue);
        localStorage.setItem('un', res.un);
        localStorage.setItem('uid', res.uid);
        const expiresAt = JSON.stringify(1000) + new Date().getTime();
        localStorage.setItem('expires_at', expiresAt);
        this.AuthService.RoleCheck();
        localStorage.setItem('AfterLogin', " ");
        this.router.navigate(['./home']);
      },
      (err: any) => {
        this.ErrorMess = err.json();
      });
  }
}