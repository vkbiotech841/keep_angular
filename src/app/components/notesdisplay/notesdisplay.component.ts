import { DialogService } from './../../services/dialog.service';
import { NoteService } from './../../services/note.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-notesdisplay',
  templateUrl: './notesdisplay.component.html',
  styleUrls: ['./notesdisplay.component.css']
})
export class NotesdisplayComponent {

  // Here, we want to use NoteService because it method store the notes array.
  // making instantance of NoteService class as noteService because class can not be used as such. It can only used afte making its instance. 
  constructor(public noteService: NoteService,
    public dialogService: DialogService) { }


}
