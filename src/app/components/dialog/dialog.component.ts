import { NoteService } from './../../services/note.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Note } from '../../models/note';
import { CanvasDialogComponent } from '../canvas-dialog/canvas-dialog.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  //  Data passing to dialog box: Angular material
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note, public noteService: NoteService, public dialog: MatDialog) { }


  ngOnInit() {
  }

  // From the already display dialog, Deleting an Image from the data that came from Note.
  deleteImage(index: number) {
    this.data.images.splice(index, 1);
  }

  // From the already display dialog, deleting an canvasImage from the data 
  deleteCanvasImage(index: number) {
    this.data.canvasImages.splice(index, 1);
  }

  // Loading multiple images: output file formate is DataURL
  readUrl(event: any) {
    let files = event.target.files;
    console.log("Hi vikram")
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.data.images.push(reader.result);  // Important: Here, images are pushed to the data not note.
        }
        reader.readAsDataURL(file);
      }
    }
  }


  // Important: Image and canvas are two different things. Image are data URL whereas canvas as drawing type (canvas).
  // If we wish to draw over Image then both need to be in the same formate, either as drawing or image.
  // In this case, we are only converting drawing to image (dataURL to canvas)

  // Image to canvas: for canvasImages array
  editCanvasImage(index: number) {
    const dialogRef = this.dialog.open(CanvasDialogComponent, {
      data: { canvasImage: this.data.canvasImages[index] }    // When dialog is opening, data is transfer as data not as note.
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.canvasImages[index] = result;   // result is being pushed to the canvasImages array with current index.
      }
    });
  }


  // Image to canvas: for Images array
  editImageAsCanvas(index: number) {
    const dialogRef = this.dialog.open(CanvasDialogComponent, {
      data: { canvasImage: this.data.images[index] }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.images[index] = result;   // result is being pushed to the Images array with current index.
      }
    });
  }
}



