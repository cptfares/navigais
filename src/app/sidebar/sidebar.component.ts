import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router, RouterModule} from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { PresenceService } from 'app/services/presence.service';




export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'overview',     title: 'overview',         icon:'fa-home',       class: '' },
    { path: 'add_container',         title: 'setup container',        icon:'fa-plus-square-o',    class: '' },
    { path: 'containers',          title: 'containers',              icon:'fa-pie-chart',      class: '' },
    { path: 'agents',          title: 'agents',              icon:' fa-users',      class: '' },
    { path: 'collaboration',     title: 'collaboration',         icon:'fa-home',       class: '' },
    { path: 'archive',     title: 'archive',         icon:' fa-archive',       class: '' },
    { path: 'maps',          title: 'Maps',              icon:'fa-map',      class: '' },
    { path: 'notifications',          title: 'notifications',              icon:'fa-map',      class: '' },

    


    

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./style.css']
})

export class SidebarComponent implements OnInit {
    @Output() islogout = new EventEmitter<void>()
    constructor(public fireservice: AuthService, public presnce: PresenceService  ,private fAuth: AngularFireAuth , public route:Router){}
    logingout(){
        this.presnce.signOut()
        this.route.navigate(['/login'])


    }
    public menuItems: any[];
    ngOnInit () {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        console.log(this.menuItems[1].title)
    }
}
