import { Notify } from 'notiflix/build/notiflix-notify-aio';

const signUpBtn = document.querySelector('#signUpBtn');
const signInBtn = document.querySelector('#signInBtn');
const signOutBtn = document.querySelector('#signOutBtn');
const authModal = document.querySelector('.js-auth-backdrop');

signUpBtn.addEventListener('click', signUp);

signInBtn.addEventListener('click', signIn);

signOutBtn.addEventListener('click', signOut);

const firebaseConfig = {
  apiKey: 'AIzaSyBPr1VTudkcsFsBQWgPSN6I9kxlXuwAlDo',
  authDomain: 'filmoteka-e121e.firebaseapp.com',
  projectId: 'filmoteka-e121e',
  storageBucket: 'filmoteka-e121e.appspot.com',
  messagingSenderId: '346793716692',
  appId: '1:346793716692:web:6bba6a3e2bf3d7e2db4441',
  measurementId: 'G-VDY9GJ98YW',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function signUp() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const promise = auth.createUserWithEmailAndPassword(
    email.value,
    password.value
  );

  promise.catch(e => {
    authModal.classList.toggle('auth-modal-hidden');
    return Notify.failure(e.message);
  });
  Notify.success('SignUp Successfully');
  authModal.classList.toggle('auth-modal-hidden');
}

function signIn() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  promise.catch(e => {
    authModal.classList.toggle('auth-modal-hidden');
    return Notify.failure(e.message);
  });
  Notify.success('SignIn Successfully');
  authModal.classList.toggle('auth-modal-hidden');
}

function signOut() {
  auth.signOut();

  Notify.success('SignOut Successfully from System');
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const email = user.email;
  } else {
    authModal.classList.toggle('auth-modal-hidden');
  }
});
