import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes),
        importProvidersFrom(provideFirebaseApp(() => initializeApp({
            "projectId": "danotes-2d564",
            "appId": "1:97233496647:web:d6271698050fe33951df62",
            "storageBucket": "danotes-2d564.firebasestorage.app",
            "apiKey": "AIzaSyBQEEWekh3t8SknkDpCuT0ietXFEoyueEQ",
            "authDomain": "danotes-2d564.firebaseapp.com",
            "messagingSenderId": "97233496647"
        }))),
        importProvidersFrom(provideFirestore(() => getFirestore()))]
};
