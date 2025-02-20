import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAk_SKyRQ-YUDW3OvOmsCcjaxEjfcRHdBU",
  authDomain: "finace-tracker-b3b12.firebaseapp.com",
  projectId: "finace-tracker-b3b12",
  storageBucket: "finace-tracker-b3b12.appspot.com",
  messagingSenderId: "2850933659",
  appId: "1:2850933659:web:d74ec2b557b2326dbdef3e",
  measurementId: "G-6XC2NW79SJ"
};

// ✅ Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); // ✅ Tambahkan Firestore
