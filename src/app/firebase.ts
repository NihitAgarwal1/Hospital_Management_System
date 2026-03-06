import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

import { firebaseConfig } from './firebase.config';

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export { app, db };
