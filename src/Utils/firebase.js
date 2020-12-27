import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCcEUg0kkrBdpMIUc2knr_TYgFn9gcw5Rw",
    authDomain: "abdhesh-1499e.firebaseapp.com",
    databaseURL: "https://abdhesh-1499e.firebaseio.com",
    projectId: "abdhesh-1499e",
    storageBucket: "abdhesh-1499e.appspot.com",
    messagingSenderId: "179450599169",
    appId: "1:179450599169:web:915a09403a082083a9ad00",
    measurementId: "G-9HNBF1G76L"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth,provider };