import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'

@Component({
  selector: 'app-canvas-dialog',
  templateUrl: './canvas-dialog.component.html',
  styleUrls: ['./canvas-dialog.component.css']
})
export class CanvasDialogComponent implements AfterViewInit {

  result: any;

  constructor(public dialogRef: MatDialogRef<CanvasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
  }

  // Drawing HTML canvas:
  @ViewChild('canvas', { static: false }) public canvas: ElementRef;

  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {    // ngAfterViewInit means when 
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 5;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#ff0000';

    // 
    if (this.data && this.data.canvasImage) {  //start
      // draw to canvas
      const img = new Image();
      img.onload = () => {
        this.cx.drawImage(img, 0, 0);
      };
      img.src = this.data.canvasImage;      // end
    }
    this.captureEvents(canvasEl);
  }





  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event    
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point    
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }




  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke()
      console.log(this.cx);
    }

    // get data-URL of the canvas and logging dataURL to the console.Please refer MDN document.
    // It is taking id from the HTML, here id is canv
    let canvas = document.getElementById('canv') as HTMLCanvasElement;
    let dataURL = canvas.toDataURL();
    console.log(dataURL);
    this.result = dataURL;
  }


  // While saving canvas, result can be saved or canvas can be cancel.
  // on click of saveCanvas, dialog box closed with result datURL(result).
  saveCanvas() {
    this.dialogRef.close(this.result);
  }


  // on click of cancelCanvas, dialog box closes without result.
  cancelCanvas() {
    this.dialogRef.close();
  }

}


