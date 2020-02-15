import { Note } from './../../models/note';
import { NoteService } from '../../services/note.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanvasDialogComponent } from '../canvas-dialog/canvas-dialog.component';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css']
})
export class AddnoteComponent {

  startEditing = false;
  note: Note = {};
  isCanvasEditing = false;

  constructor(public noteService: NoteService, public dialog: MatDialog) { }

  // Function to be used in component HTML.
  startNoteAdding() {
    this.startEditing = true;
  }

  // Method for adding title, description, images and canvasImages to the note.
  saveNote() {
    if (this.isCanvasEditing == true) {
      return;
    }
    this.startEditing = false;
    if (this.note.title || this.note.description || this.note.images || this.note.canvasImages) {
      this.noteService.addNote(this.note);
      this.note = {};
    }
  }


  // Loading multiple images to images array in note array
  readUrl(event: any) {    // this taken an event
    this.note.images = [];  // setting note images array as empty 
    let files = event.target.files;  // storing images or target to the files.
    if (files) {
      for (let file of files) {     // This is for uploading multiple images.
        let reader = new FileReader();
        reader.onload = (e) => {
          this.note.images.push(reader.result);
        }
        reader.readAsDataURL(file); // Images are saved as DataURL.
      }
    }
  }

  // Opening method for CanvasDialogComponent as an entry component:Material dialog
  // clicking on edit icon on its view,openCanvas method, which further follows CanvasDialogComponent(dynamic) function, where save button saves canvasImages to the Note.canvasImages array.
  // clickOutside the addnote area transfer data to the Note object.
  openCanvas() {
    this.isCanvasEditing = true;
    const dialogRef = this.dialog.open(CanvasDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {    // while closing dialog, subscribing result
      if (result) {
        if (!this.note.canvasImages) {       // if result is not a canvasImages
          this.note.canvasImages = [];       // set canvasImages arrary to empty
        }
        this.note.canvasImages.push(result); // add result to the canvasImages array
      }
      this.isCanvasEditing = false;
    });
  }
}
