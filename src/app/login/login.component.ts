import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ComapniesGurdService } from 'app/services/comapnies-gurd.service';
import { UserInfoService } from 'app/services/user-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup
  fireMessage: string;
  loginfirsmessage: string



  constructor( private fAuth: AngularFireAuth,  private fireservice : AuthService, private route : Router,private companiesRef: ComapniesGurdService, public userInfos:UserInfoService  ) { 
    this.fireMessage=""
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl ("",[Validators.required,Validators.email]),
      'password': new FormControl ("",Validators.required)

    })
  }
  logIn(){
    if (this.loginForm.invalid){
      return
    }else{
      this.fireservice.loginUser(this.loginForm.value.email,this.loginForm.value.password).then(result=>{
        if (result==null){
          console.log("logging...")
          this.route.navigate(['dashboard/overview'])
        } else if(result.isValid==false) {
          console.log("login eroor",result)
          this.loginfirsmessage= result.message

        }
      })
    }
  }
  login(){
    this.route.navigate(['sgin-up'])
  }

}
