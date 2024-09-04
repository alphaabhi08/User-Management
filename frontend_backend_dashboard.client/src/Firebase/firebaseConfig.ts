import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5FnZmBv1YqhJXEdC5ppwSoLBZ4uTfAoM",
  authDomain: "e-commerce-project-42aae.firebaseapp.com",
  projectId: "e-commerce-project-42aae",
  storageBucket: "e-commerce-project-42aae.appspot.com",
  messagingSenderId: "510935995543",
  appId: "1:510935995543:web:e726ea259a7977071d85d2",
  measurementId: "G-51TVJZY2JC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
