import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router, RouterModule} from '@angular/router';
import { AuthService } from 'app/services/auth.service';




export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'overview',     title: 'overview',         icon:'fa-home',       class: '' },
    { path: 'containers',         title: 'add container',        icon:'fa-plus-square-o',    class: '' },
    { path: 'tables',          title: 'containers',              icon:'fa-pie-chart',      class: '' },
    { path: 'agents',          title: 'agents',              icon:' fa-users',      class: '' },
    { path: 'maps',          title: 'Maps',              icon:'fa-map',      class: '' },
    


 

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    @Output() islogout = new EventEmitter<void>()
    constructor(public fireservice: AuthService, private fAuth: AngularFireAuth , public route:Router){}
    logingout(){
        this.fAuth.signOut()
        this.route.navigate(['/login'])


    }
    public menuItems: any[];
    ngOnInit () {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        console.log(this.menuItems[1].title)
    }
}
