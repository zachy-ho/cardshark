import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyA954Xl9uCXTM4zCAcRr-tYyAwbhwd2BI8',
  authDomain: 'flashkardz-dbb62.firebaseapp.com',
  projectId: 'flashkardz-dbb62',
  storageBucket: 'flashkardz-dbb62.appspot.com',
  messagingSenderId: '1074615027821',
  appId: '1:1074615027821:web:b4033313b78283ee935764',
  measurementId: 'G-ZPT6975E60',
};

firebase.initializeApp(config);

export default firebase;
