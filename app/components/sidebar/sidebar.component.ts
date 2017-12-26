import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../AuthService/Auth.Service";
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    Role: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Dashboard', icon: 'dashboard', class: '', Role: true },
    { path: 'applicants', title: 'applicants', icon: 'person', class: '', Role: true },
    { path: 'jobs', title: 'jobs', icon: 'work', class: '', Role: true },
    { path: 'app-archives', title: 'Archive', icon: 'folder open', class: '', Role: false },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    providers: [AuthService]
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    Currentuser = "";
    constructor(private AuthService: AuthService ) { }
    ngOnInit() {
        this.Currentuser = localStorage.getItem("un");
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
