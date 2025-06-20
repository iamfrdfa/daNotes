import {inject, Injectable} from '@angular/core';
import {Firestore, collection, doc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Note} from "../interfaces/note.interface";


@Injectable({
    providedIn: 'root'
})
export class NoteListService {

    trashNotes: Note[] = [];
    normalNotes: Note[] = [];

    firestore = inject(Firestore);

    constructor() { }

    //itemCollection = collection(this.firestore, 'items');

    getNoteshRef(){
        return collection(this.firestore, 'notes');
    }

    getTrashRef(){
        return collection(this.firestore, 'trash');
    }

    getSingleDoc(colId:string, docId:string){
        return doc(collection(this.firestore, colId), docId);
    }
}
