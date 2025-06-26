import {inject, Injectable} from '@angular/core';
import {Firestore, collection, doc, collectionData, onSnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Note} from "../interfaces/note.interface";


@Injectable({
    providedIn: 'root'
})
export class NoteListService {

    trashNotes: Note[] = [];
    normalNotes: Note[] = [];

    // @ts-ignore
    items$;
    firestore: Firestore = inject(Firestore);

    unsubList;
    unsubSingle;

    constructor() {
        this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
            list.forEach(element => {
                console.log(element);
            });
        });

        this.unsubSingle = onSnapshot(this.getSingleDoc("notes", "a65465s4dfsd654654"), (element) => {
        });

        this.unsubSingle();
        this.unsubList();

        this.items$ = collectionData(this.getNotesRef());
        this.items$ = this.items$.subscribe( (list: any[]) => {
            list.forEach(element => {
                console.log(element);
            });
        })
    }

    ngOnDestroy() {
        this.items$.unsubscribe();
        this.unsubList();
    }

    //itemCollection = collection(this.firestore, 'items');

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
