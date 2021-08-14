import { Component } from '@angular/core';
import { PresenceService } from './services/presence.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent{

constructor( public presnce: PresenceService ){

}
    ngOnInit(){


  
}

}
