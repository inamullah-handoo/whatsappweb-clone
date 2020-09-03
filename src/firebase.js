import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyAdffeaqR1zYe04-H21rl3qColwFr7gC8I',
	authDomain: 'cloneapps-c741c.firebaseapp.com',
	databaseURL: 'https://cloneapps-c741c.firebaseio.com',
	projectId: 'cloneapps-c741c',
	storageBucket: 'cloneapps-c741c.appspot.com',
	messagingSenderId: '372349022800',
	appId: '1:372349022800:web:668907741dc7365c73d755',
	measurementId: 'G-FBZ7H64JT8',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
