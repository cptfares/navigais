import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor( private fireservice: AngularFireAuth , private route: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      	return new Promise((resolve,reject)=>{
          this.fireservice.onAuthStateChanged((user)=>{
            if(user){
              resolve(true)

            }else{
              console.log("Authguard user not logged in")
              this.route.navigate(['/'])
              resolve(false)
            }
          })

        })
   
  }
  
}
