import { Component, OnInit } from '@angular/core';
import { ArchiveService } from 'app/services/archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  archive:Array<object>=[]

  constructor( public archive1:ArchiveService ) { }

  ngOnInit(): void {
    this.archive   = this.archive1.getarchive()
  }

}
