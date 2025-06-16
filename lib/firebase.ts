import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxi8wYBreu9ashaBhY7Kq9hQihlbLvWTg",
  authDomain: "finity-d39ce.firebaseapp.com",
  projectId: "finity-d39ce",
  storageBucket: "finity-d39ce.firebasestorage.app",
  messagingSenderId: "138344018681",
  appId: "1:138344018681:web:ef17af1538f3be626b2828",
  measurementId: "G-YMS7EE454Z",
}

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Use emulators for local development if needed
if (process.env.NODE_ENV === "development") {
  // Uncomment these lines if you're using Firebase emulators
  // connectAuthEmulator(auth, 'http://localhost:9099')
  // connectFirestoreEmulator(db, 'localhost', 8080)
  // connectStorageEmulator(storage, 'localhost', 9199)
}

export { app, auth, db, storage }
