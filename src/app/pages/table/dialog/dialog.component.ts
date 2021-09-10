import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArchiveService } from 'app/services/archive.service';
import { Company } from 'app/services/company';
import { Container } from 'app/services/container';
import { ContainerService } from 'app/services/container.service';
import { Observable } from 'rxjs';
declare var google: any;


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
information:Container
sensors =["temp", "hum","touch", "infrared","flame", "laser"]
  constructor( public archive:ArchiveService,  private dialogRef: MatDialog,private detailed: ContainerService , public route: Router, private database : AngularFireDatabase) { }

  ngOnInit(): void {

       this.getcontainr()
      var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
      var mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

      }
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var marker = new google.maps.Marker({
          position: myLatlng,
          title:"Hello World!"
      });

      // To add the marker to the map, call setMap();
      marker.setMap(map);

    
  }
  unactive(){
    this.detailed.deactive(this.information.id)
    this.archive.setarchive(this.information)

  }
  getcontainr(){
    this.database.object("containers/"+this.detailed.chckedContainer.id).valueChanges().subscribe((res:Container)=>{
      this.information=  res
    })

  }
  change(){
    this.detailed.changeDetail(this.information)
    this.route.navigate(['dashboard/setup_container'])
    

  }

}
