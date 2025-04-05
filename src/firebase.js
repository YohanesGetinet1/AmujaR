import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get, remove, update } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAuwHxlHIHr2GdoJrGyR4x5dJRZlQkfOmw",
    authDomain: "jodata-7bc36.firebaseapp.com",
    databaseURL: "https://jodata-7bc36-default-rtdb.firebaseio.com/",
    projectId: "jodata-7bc36",
    storageBucket: "jodata-7bc36.appspot.com",
    messagingSenderId: "397988027675",
    appId: "1:397988027675:web:27e247d479852a0ad2c7be"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, get, remove, update };