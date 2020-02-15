import { SidenavService } from './services/sidenav.service';
import { Component, ViewChild, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'xelpmoc-keep';

  // Linking HTML (view) reference value to the componenent.ts file (child)
  // and storing to sideNavRefernce variable.  
  @ViewChild('drawer', { static: true }) sideNavReference: any;

  constructor(
    public sidenavService: SidenavService, ) {
  }
  ngOnInit() {
    // Calling setSideNavReference(). This will store the reference value in sideNavReference. 
    this.sidenavService.setSideNavReference(this.sideNavReference);
  }

}




