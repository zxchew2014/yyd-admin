import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_KEY
};

const yydASConfig = {
  apiKey: process.env.REACT_APP_YYD_AS_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_YYD_AS_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_YYD_AS_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_YYD_AS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_YYD_AS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_YYD_AS_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_YYD_AS_FIREBASE_API_KEY
};

export const yydAdminApp = firebase.initializeApp(config);
export const yydAdminDb = yydAdminApp.database();

export const yydASApp = firebase.initializeApp(yydASConfig, "other");
export const yydASAuth = yydASApp.auth();
export const yydASDb = yydASApp.database();

export const branchesRef = yydASDb.ref("Branches");
export const teachersRef = yydASDb.ref("Teacher_Allocation");
export const subjectsRef = yydASDb.ref("Subjects");
export const statesRef = yydASDb.ref("States");
export const attendancesRef = yydASDb.ref("Attendances");
export const studentsRef = yydASDb.ref("New_Students");
export const adminsRef = yydASDb.ref("Admins");
export const featureFlagRef = yydASDb.ref("feature_flag");

export default firebase;
