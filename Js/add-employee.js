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

const db = getFirestore();

let username = document.getElementById('username');
let password = document.getElementById('password');

let addbtn = document.getElementById('addbtn');

async function add_employee(){

    if (username.value != "") {
        username.classList.remove("req");

        if (password.value != "") {
            if (password.value.length >= 8) {

                var ref = doc(db, "Employees", username.value);

                const docSnap = await getDoc(ref);

                if(docSnap.exists()) {
                    username.classList.add("req");
                    alert('الموظف موجود مسبقا');
                    // location.reload();
                } 

                else {
                    await setDoc(
                        ref, {
                            Username: username.value,
                            Password: password.value,
                            Status: true
                        }
                    )
                    .then(()=> {
                        alert('تمت إضافة الموظف');
                        window.location.replace('employees.html');
                    })
                    .catch((error)=> {
                        alert('Unsuccessfully Operatin, error'+error);
                    });
                }
            } else {
                password.classList.add("req");
                alert('كلمة المرور يجب أن تحتوي علي 8 خانات');
        }
    } else {
        password.classList.add("req");
        alert('يجب تعبئة الحقول المطلوبة');
    }
    } else {
        username.classList.add("req");
        alert('يجب تعبئة الحقول المطلوبة');
    //     let e = document.getElementsByClassName('req');
    
    // for (var i = 0; i < e.length; i++) {
    //     e[i].style.boxShadow ="0px 0px 0px 2px #ff0119b8";
    // }

    // alert('يجب تعبئة الحقول المطلوبة');
    }
}

window.onload = async function() {
    if (localStorage.getItem('user') != null && localStorage.getItem('pass') != null) {

        let em = document.getElementById('em');
        var ref = doc(db, "Employees", localStorage.getItem('user'));

        const docSnap = await getDoc(ref);

        if(docSnap.exists()) {
            if (docSnap.data().Status == true) {
                if (docSnap.data().type == '1') {
                    // GetAllDataRealTime();
                    document.body.style.display = 'block';
                } else {
                    window.location = 'login.html';
                }
            } else {
                    window.location = 'login.html';
            }
            } else {
            window.location = 'login.html';
            }
        } else {
            window.location = 'login.html';
        }

 }

addbtn.addEventListener('click', add_employee);
