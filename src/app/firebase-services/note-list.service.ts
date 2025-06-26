import {inject, Injectable} from '@angular/core';
import {Firestore, collection, doc, collectionData, onSnapshot, addDoc} from '@angular/fire/firestore';
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

    async addNote(item: Note) {
        await addDoc(this.getNotesRef(), this.item).catch(
            (err) => {
                console.error(err);
            }
        ) .then(
            (docRef) => {console.log("Document written with ID: ", docRef?.id);}
        )

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

    getSingleDoc(colId: string, docId: string) {
        return doc(collection(this.firestore, colId), docId);
    }
}
function then(): any {
    throw new Error('Function not implemented.');
}

