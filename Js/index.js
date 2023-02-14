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

import {getFirestore, doc, getDoc, collectionGroup, getDocs, getCountFromServer, collection, onSnapshot, startAt, query, orderBy, startAfter, endAt, endBefore, where}
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const db = getFirestore();

let em = document.getElementById('em');

window.onload = async function() {

    if (localStorage.getItem('user') != null && localStorage.getItem('pass') != null) {

        var ref = doc(db, "Employees", localStorage.getItem('user'));

        const docSnap = await getDoc(ref);

        if(docSnap.exists()) {
            if (docSnap.data().Status == true) {
                document.body.style.display = 'block';
                if (docSnap.data().type != '1') {
                    em.remove();
                } else {
                    return 0;
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

let signout = document.getElementById('signout');

function Signout() {
    if (sessionStorage.getItem('user') != null) {
        window.sessionStorage.removeItem('user');
        window.sessionStorage.removeItem('pass');
    }
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('pass');
    window.localStorage.removeItem('keepLogIn');
    window.location = 'login.html';
}
signout.addEventListener('click', Signout);

// Counts

const coll = collection(db, "Books");
const snapshot = await getCountFromServer(coll);
console.log('count: ', snapshot.data().count);

let books_count = document.getElementById('books_count');
books_count.innerHTML = snapshot.data().count;

const coll2 = collection(db, "Users");
const snapshot2 = await getCountFromServer(coll2);
console.log('count: ', snapshot2.data().count);

let customers_count = document.getElementById('customers_count');
customers_count.innerHTML = snapshot2.data().count;

const coll3 = collectionGroup(db, "Orders");

const query_ = query(coll3, where('status', '==', 'تحت المراجعة'));
const snapshot3 = await getCountFromServer(query_);
console.log('count: ', snapshot3.data().count);

let ord = document.getElementById('reviewing');
ord.innerHTML = snapshot3.data().count;


const query2_ = query(coll3, where('status', '==', 'ملغية'));
const snapshot4 = await getCountFromServer(query2_);
console.log('count: ', snapshot4.data().count);

let ord2 = document.getElementById('cancelled');
ord2.innerHTML = snapshot4.data().count;


const query3_ = query(coll3, where('status', '==', 'قيد التوصيل'));
const snapshot5 = await getCountFromServer(query3_);
console.log('count: ', snapshot5.data().count);

let ord3 = document.getElementById('on-way');
ord3.innerHTML = snapshot5.data().count;


const query4_ = query(coll3, where('status', '==', 'تم الاستلام'));
const snapshot6 = await getCountFromServer(query4_);
console.log('count: ', snapshot6.data().count);

let ord4 = document.getElementById('deliverd');
ord4.innerHTML = snapshot6.data().count;

// Total prices

const query5_ = query(coll3, where('status', '==', 'تحت المراجعة'));
const snapshot7 = await getDocs(query5_);
var t1 = 0;
snapshot7.forEach((d) => {
    t1 = t1 + d.data().total_price;
});

let rg_total = document.getElementById('rg_total');
rg_total.innerHTML = t1+" د.ل";


const query6_ = query(coll3, where('status', '==', 'تم الاستلام'));
const snapshot8 = await getDocs(query6_);
var t2 = 0;
snapshot8.forEach((d) => {
    t2 = t2 + d.data().total_price;
});

let dd_total = document.getElementById('dd_total');
dd_total.innerHTML = t2+" د.ل";

const query7_ = query(coll3, where('status', '==', 'ملغية'));
const snapshot9 = await getDocs(query7_);
var t3 = 0;
snapshot9.forEach((d) => {
    t3 = t3 + d.data().total_price;
});

let cd_total = document.getElementById('cd_total');
cd_total.innerHTML = t3+" د.ل";

const query8_ = query(coll3, where('status', '==', 'قيد التوصيل'));
const snapshot10 = await getDocs(query8_);
var t4 = 0;
snapshot10.forEach((d) => {
    t4 = t4 + d.data().total_price;
});

let dg_total = document.getElementById('dg_total');
dg_total.innerHTML = t4+" د.ل";