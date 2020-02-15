import { Note } from './../../models/note';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { NoteService } from '../../services/note.service';
import { CanvasDialogComponent } from '../canvas-dialog/canvas-dialog.component';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  // Parent to child component interaction: Angular basics
  // Here, note is the child of addnote.
  @Input() note: Note;    // Note object will acts as input for noteDisplay component hence @input (input decorator) was used. 
  @Input() currentNoteIndex: number;

  isCanvasEditing = false;
  dialogRef: any;

  constructor(public dialog: MatDialog,
    public noteService: NoteService) { }



  // Loading multiple images to images array in note object.
  // readUrl is an event handler for change event in it template (HTML).
  // Uploaded images are push to the note.images array.
  readUrl(event: any) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.note.images.push(reader.result); // Important: Here, Images are pushed to the note not data.
        }
        reader.readAsDataURL(file);
      }
    }
  }

  // on click of the Note object, displayNoteDetails will display on the dialog.
  // Since, dialog with open from note component,logic is written here.
  // For each Note object images are pushed using *ngFor loop in its template.
  displayNoteDetails() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      height: 'auto',
      data: this.note     // When dialog is opening, data is transfer as data not as note.
    });
    console.log(this.dialogRef);
  }


  // Opening canvas from the note object.
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


