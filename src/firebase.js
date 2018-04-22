import firebase from 'firebase';

export const config = {
    apiKey: process.env.YYD_ADMIN_FIREBASE_API_KEY,
    authDomain: process.env.YYD_ADMIN_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.YYD_ADMIN_FIREBASE_DATABASE_URL,
    projectId: process.env.YYD_ADMIN_FIREBASE_PROJECT_ID,
    storageBucket: process.env.YYD_ADMIN_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.YYD_ADMIN_FIREBASE_MESSAGING_SENDER_ID
};

export const yydASConfig = {
    apiKey: process.env.YYD_AS_FIREBASE_API_KEY,
    authDomain: process.env.YYD_AS_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.YYD_AS_FIREBASE_DATABASE_URL,
    projectId: process.env.YYD_AS_FIREBASE_PROJECT_ID,
    storageBucket: process.env.YYD_AS_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.YYD_AS_FIREBASE_MESSAGING_SENDER_ID
};

export const yydAdminApp = firebase.initializeApp(config);
export const yydAdminAuth = yydAdminApp.auth();
export const yydAdminDb = yydAdminApp.database();

export const yydASApp = firebase.initializeApp(yydASConfig, "yydAS");
export const yydASAuth = yydASApp.auth();
export const yydASDb = yydASApp.database();

export default firebase;
