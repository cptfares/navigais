import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'app/services/messaging.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
 
  constructor( private toostr: ToastrService, private noti: MessagingService   ) { 
    
  }

  ngOnInit() { 

      this.noti.alerts()
  
   
    
  }
}
