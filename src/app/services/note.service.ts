import { Injectable } from '@angular/core';
import { Note } from '../models/note';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[] = [];

  constructor() { }

  // Adding note to the notes array.
  addNote(note: Note) {
    this.notes.push(note);
  };

  // Deleting note from the notes array.
  deleteNote(index) {
    this.notes.splice(index, 1);
  };



}
