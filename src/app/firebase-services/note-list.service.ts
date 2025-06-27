import {inject, Injectable} from '@angular/core';
import {Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Note} from "../interfaces/note.interface";
import {DocumentData} from "@angular/fire/compat/firestore";


class WithFieldValue<T> {
}

@Injectable({
    providedIn: 'root'
})
export class NoteListService {

    trashNotes: Note[] = [];
    normalNotes: Note[] = [];

    firestore: Firestore = inject(Firestore);

    unsubNotes;
    unsubTrash;
    private item: WithFieldValue<DocumentData> | undefined;

    constructor() {
        this.unsubNotes = this.subNotesList();
        this.unsubTrash = this.subTrashList();
    }

    async updateNote(note: Note) {
        if (note.id) {
            let docRef = this.getSingleDocRef(this.getColIdFromNote(note), note.id);
            await updateDoc(docRef, this.getCleanJson(note)).catch(
                (error) => {
                    console.log("Fehler beim Aktualisieren der Note:", error);
                }
            );
        }
    }

    getCleanJson(note: Note): { } {
        return {
            type: note.type,
            title: note.title ,
            content: note.content,
            marked: note.marked,
        };
    }

    getColIdFromNote(note: Note): string {
        if (note.type === "note") {
            return "notes";
        } else {
            return "trash";
        }
    }

    async addNote(note: Note) {
        try {
            return await addDoc(this.getNotesRef(), note);
        } catch (error) {
            console.error("Fehler beim Hinzufügen der Note:", error);
            throw error;
        }
    }

    ngonDestroy() {
        this.unsubNotes();
        this.unsubTrash();
    }

    subTrashList() {
        this.trashNotes = [];
        return onSnapshot(this.getTrashRef(), (list) => {
            list.forEach(element => {
                this.trashNotes.push(this.setNoteObject(element.data(), element.id));
            });
        });
    }

    subNotesList() {
        this.normalNotes = [];
        return onSnapshot(this.getNotesRef(), (list) => {
            list.forEach(element => {
                this.normalNotes.push(this.setNoteObject(element.data(), element.id));
            });
        });
    }

    setNoteObject(obj: any, id: string): Note {
        return {
            id: id || "",
            type: obj.type || "note",
            title: obj.title || "",
            content: obj.content || "",
            marked: obj.marked || false
        }
    }

    getNotesRef() {
        return collection(this.firestore, 'notes');
    }


    getTrashRef() {
        return collection(this.firestore, 'trash');
    }

    getSingleDocRef(colId: string, docId: string) {
        return doc(collection(this.firestore, colId), docId);
    }
}

function then(): any {
    throw new Error('Function not implemented.');
}

