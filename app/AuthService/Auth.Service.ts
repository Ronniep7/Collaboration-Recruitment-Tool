import { Injectable } from "@angular/core";
import { DbService } from "../DbService/DbService";
import { Router } from "@angular/router";


@Injectable()
export class AuthService {

  constructor(private Service: DbService, private router: Router, ) {
    this.AuthState();
    this.RoleCheck();
  }

  IsLogged = false;
  Role: boolean = false;

  AuthState() {

    if (localStorage.getItem('Session')) {
      this.IsLogged = true;
    }
    else {
      this.IsLogged = false;
    }
  }

  RoleCheck() {
    const req = this.Service.GetUserState('ManagerLogins');
    req.map(res => <any>res.json()).
      subscribe(res => {
        this.Role = res;
      },
      (err: any) => {
        this.Role = false;
      });
  }

  LogOff() {
    debugger;
    let SessionToServer = localStorage.getItem('Session');
    const Req = this.Service.LogOut("ManagerLogins", SessionToServer);
    Req.subscribe(res => {
      window.location.reload();
      localStorage.removeItem('Session');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('ue');
      localStorage.removeItem('un');
      localStorage.removeItem('uid');
      this.RoleCheck();
      this.router.navigate(['./login']);

    },
      (err: any) => {
      });
  }
}





