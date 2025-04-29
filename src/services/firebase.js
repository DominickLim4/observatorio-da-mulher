import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = process.env.REACT_APP_FIREBASE_CONFIG 
  ? JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)
  : {
      apiKey: "AIzaSyD8dcUEwAQZpgBz3K0ENiOJMfY4mXz1L4Q",
      authDomain: "mulheres-app.firebaseapp.com",
      projectId: "mulheres-app",
      storageBucket: "mulheres-app.firebasestorage.app",
      messagingSenderId: "968268493259",
      appId: "1:968268493259:web:c213554298fbbb60a9864e",
      measurementId: "G-PLTVH1MQMX"
    };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;