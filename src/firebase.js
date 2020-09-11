import firebase from 'firebase'

// Access your firebase account and get your settings
var firebaseConfig = ''

if (!firebaseConfig) alert('Enter your firebase account settings in "src/firebase"')

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase