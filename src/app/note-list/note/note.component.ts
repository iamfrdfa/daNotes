import {Component, Input} from '@angular/core';
import {Note} from '../../interfaces/note.interface';
import {NoteListService} from '../../firebase-services/note-list.service'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-note',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './note.component.html',
    styleUrl: './note.component.scss'
})
export class NoteComponent {
    @Input() note!: Note;
    edit = false;
    hovered = false;

    constructor(private noteService: NoteListService) {
    }

    changeMarkedStatus() {
        this.note.marked = !this.note.marked;
        this.saveNote();
    }

    deleteHovered() {
        if (!this.edit) {
            this.hovered = false;
        }
    }

    openEdit() {
        this.edit = true;
    }

    closeEdit() {
        this.edit = false;
        this.saveNote();
    }

    moveToTrash() {
        this.note.type = 'trash';
    }

    moveToNotes() {
        this.note.type = 'note';
    }

    deleteNote() {

    }

    saveNote() {
        this.noteService.updateNote(this.note);
    }
}
