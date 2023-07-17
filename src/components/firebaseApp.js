import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAerfzASLQnp6ekCLYs5JuobMxdq3GzpPY",
    authDomain: "twitter-clone-41cbf.firebaseapp.com",
    projectId: "twitter-clone-41cbf",
    storageBucket: "twitter-clone-41cbf.appspot.com",
    messagingSenderId: "799098195160",
    appId: "1:799098195160:web:a74a935acc74de5a6bdbad"
  };

  const app = initializeApp(firebaseConfig);


  const db = getFirestore(app);


  export default db;