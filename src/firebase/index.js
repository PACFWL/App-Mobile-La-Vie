import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import Constants from "expo-constants";

export const REALTIME_DB_URL = Constants.expoConfig?.extra?.FIREBASE_REALTIME_DB_URL;
export const AUTH_LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Constants.expoConfig?.extra?.FIREBASE_API_KEY}`;
export const AUTH_REGISTER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Constants.expoConfig?.extra?.FIREBASE_API_KEY}`;

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  databaseURL: Constants.expoConfig?.extra?.FIREBASE_REALTIME_DB_URL,
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app);
