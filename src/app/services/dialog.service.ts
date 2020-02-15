import { Injectable } from '@angular/core';

export interface Dialog {
  title?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogs: Dialog[] = [];

  constructor() { }

  addDialog(index) {
    this.dialogs.indexOf(index);
    console.log(this.dialogs);
  };
}
