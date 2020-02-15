import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  // In order to take refernce value (#) from view (HTMl), first we have created an object. Which type is any
  sideNavReference: any;
  constructor() { }

  // created a method where sideNavReference object will store reference from view.
  setSideNavReference(reference: any) {
    this.sideNavReference = reference;
  }
  // Making toggle method which takes a stored reference from view and already has stored in sideNavReference.
  sideNavToggle() {
    this.sideNavReference.toggle();
  }


}
