// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDezuj7apPKm7T-qUI7KDiNf84qgqv9tKM",
    authDomain: "mybook-f7793.firebaseapp.com",
    projectId: "mybook-f7793",
    storageBucket: "mybook-f7793.appspot.com",
    messagingSenderId: "653370201249",
    appId: "1:653370201249:web:e4e9b0919da91b63b88ce0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, Timestamp}
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const db2 = getFirestore();

const username = document.getElementById('username');
const pass = document.getElementById('pass');
const submit = document.getElementById('sub_btn');

async function AuthenticateEmployee() {

    if (username.value != "") {
        if (pass.value != "") {

    var ref = doc(db2, "Employees", username.value);

    const docSnap = await getDoc(ref);

    
        if (docSnap.exists()) {
            console.log(docSnap.data().Password);
            let dbpass = docSnap.data().Password;
            if (dbpass == pass.value) {
                login(docSnap.data().Username, docSnap.data().Password);
            }

            else {
                alert('خطأ في إسم المستخدم أو كلمة المرور');
            }
        }

        else {
            alert('المستخدم غير موجود');
        }

    } else {
        alert('الرجاء إدخال الحقول المطلوبة');
    }

} else {
    alert('الرجاء إدخال الحقول المطلوبة');
}
}

function login(user, password) {
    let keepLogIn = document.getElementById('checkbox').checked;

    if(!keepLogIn) {
    //    sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('user', user);
        sessionStorage.setItem('pass', password);
       window.location = "index.html";
    }
    else {
        localStorage.setItem('keepLogIn', 'yes');
        // localStorage.setItem('user', JSON.stringify(user));

        localStorage.setItem('user', user);
        localStorage.setItem('pass', password);
        window.location = "index.html";
    }
}

submit.addEventListener('click', AuthenticateEmployee);