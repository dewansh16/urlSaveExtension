import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvedjxQbIzdyECxTSdWDaU-i3vJCJp1Ko",
  authDomain: "urlsaveextension.firebaseapp.com",
  projectId: "urlsaveextension",
  storageBucket: "urlsaveextension.appspot.com",
  messagingSenderId: "51290603816",
  appId: "1:51290603816:web:3ae7efb37ec2eab58a101d",
  measurementId: "G-X0QY39ZG3B",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();

export const saveUrl = async (url: string): Promise<void> => {
  try {
    await db.collection("urls").add({
      url,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving URL:", error);
  }
};

export const onUrlsSnapshot = (
  callback: (urls: { id: string; url: string; timestamp: Date }[]) => void
) => {
  return db
    .collection("urls")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      const urls = snapshot.docs.map((doc) => ({
        id: doc.id,
        url: doc.data().url,
        timestamp: doc.data().timestamp.toDate(),
      }));
      callback(urls);
    });
};
