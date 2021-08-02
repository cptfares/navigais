import { Component } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfoService  } from 'app/services/user-info.service';
import { User } from 'app/services/user';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';




@Component({
    selector: 'typography-cmp',
    moduleId: module.id,
    templateUrl: 'typography.component.html'
})

export class TypographyComponent{
    userinfo: Observable <User> ;
    userform : FormGroup
    onclick= true ;
    email: string;
    fullname:string
    company:string
    city:string
    country: string
    adress:string
    phone:number
    userid:string
    role:string
    password:string

    constructor(public firebaseAuth : AngularFireAuth , private afs : AngularFirestore , public userInfos:UserInfoService,  private afAuth : AuthService , ) { }
    ngOnInit() {

        this.userInfos.getUserInfo().subscribe(user=>{
            this.fullname=user.fullName
            this.email= user.email
            this.company= user.company
            this.city=user.city
            this.country=user.country
            this.adress=user.adress
            this.phone=user.phone
            this.role= user.role
            this.password= user.password
        })
        this.firebaseAuth.authState.subscribe(user => {
          this.userid=user.uid
        
    
        }) 




      }

      async updateProfile () {
        this.onclick= !this.onclick
        if (this.onclick){
                  this.afs.collection('users').doc(this.userid).set({
          "fullName": this.fullname,
          "email": this.email,
          "phone": this.phone,
          "company": this.company,
          "city": this.city,
          "country": this.country,
          "role": this.role,
          "edit date": Date.now()

        }, {merge:true})
        }


      }
      cancel(){
        this.onclick= false
      }

}