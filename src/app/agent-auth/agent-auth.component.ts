import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgentAuthService } from 'app/services/agent-auth.service';
import { AuthService } from 'app/services/auth.service';
import { ComapniesGurdService } from 'app/services/comapnies-gurd.service';
import { Company } from 'app/services/company';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-agent-auth',
  templateUrl: './agent-auth.component.html',
  styleUrls: ['./agent-auth.component.css']
})
export class AgentAuthComponent implements OnInit {
  singupForm :FormGroup
  loginForm : FormGroup
  loginfirsmessage: string
  fireMessage : string
  isSignin=false
  company= new Company
  uid:string
  name: String;
  givencode:string
  showSingup= false;
  show =false;
  userCompany:Company
  


  constructor( public dialog : MatDialog, public db:AngularFireDatabase   ,public firebase:AngularFirestore, public at : AgentAuthService, public agentAuth:AgentAuthService, private companyGrud:ComapniesGurdService,   private fireservice : AuthService, private route : Router, private route1:ActivatedRoute ) { }

  ngOnInit(): void {
    this.singupForm= new FormGroup({
      "company": new FormControl (""),
      "companyId": new FormControl (""),
      'fullName': new FormControl ("",Validators.required),
      'email': new FormControl ("",[Validators.required,Validators.email]),
      'adress': new FormControl ("",Validators.required),
      'country': new FormControl ("",Validators.required),
      'phone': new FormControl (0,Validators.required),
      'password': new FormControl ("",Validators.required),
      "role": new FormControl ("agent"),
      "status":new FormControl ("offline")

    })
    this. givencode = this.route1.snapshot.paramMap.get('code');
    console.log(this.givencode)
    this.db.list('companies').valueChanges().subscribe((res)=>
    res.forEach((a:Company)=>{
          if ( this.givencode==a.admin){
           this.show= true
           this.userCompany={
             name:a.name,
             admin: a.admin,
             containers:a.containers,
             agents:a.agents,
             archive:a.archive,
             coll:a.coll,
             notifications:a.notifications


            
           }
           
       
      }
    })

    
 
  

  )
  }






sginUp() {
  this.singupForm.value.company=this.userCompany.name
  this.singupForm.value.companyId=this.givencode+"1"
  console.log(  this.singupForm)

 
  if(this.singupForm.invalid)
  return 
  else{
    this.at.sginupUser(this.singupForm.value,this.userCompany,this.singupForm.value,this.givencode).then(result=>{
      if (result==null ){
        console.log(result)
      this.route.navigate(['dashboard/overview']);

      }else if(result.isValid==false)
      this.fireMessage= result.message
    }).then(user=>{

      console.log(user)
    })
    
    .catch(()=>{

    })
  }
}

}
