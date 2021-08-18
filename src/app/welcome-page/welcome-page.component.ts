import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  constructor(  private route : Router  ) { 
   
  }
 
  ngOnInit(): void {
  }
  join(){
    this.route.navigate(['login'])
  }









  

}
