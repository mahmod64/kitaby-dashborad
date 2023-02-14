var tbody = document.getElementById('tbody1');
        
function AddItemTotable(ISBN, Title, Author, Publisher, Quantity, Category, Price){
    globalThis.trow = document.createElement("tr");
    trow.className = "rr";

    let td0 = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');

    td0.innerHTML = `<a href='view-book.html?isbn=${ISBN}'><img src="search.png"></a>`
    td1.innerHTML = ISBN;
    td2.innerHTML = Title;
    td3.innerHTML = Author;
    td4.innerHTML = Publisher;
    td5.innerHTML = Quantity;
    td6.innerHTML = Category;
    td7.innerHTML = Price;

    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);

    tbody.appendChild(trow);
}

function AddAllItemsTotable(Books) {
    tbody.innerHTML = "";

    Books.forEach(element => {
        AddItemTotable(element.ISBN, element.Title, element.Author, element.Publisher, element.Quantity, element.Category, element.Price);
    });
}


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// const { initializeApp } = require('https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js');
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

import {getFirestore, doc, getDoc, collectionGroup, getDocs, collection, onSnapshot, startAt, query, orderBy, startAfter, endAt, endBefore, where}
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const db = getFirestore();

let search = document.getElementById('search');
let search2 = document.getElementById('search2');

async function getDataByISBN() {

    let row = document.createElement("tr");
    let td = document.createElement('td');
    let rr = document.getElementsByClassName('rr');

    td.innerHTML = 'لا توجد بيانات';

    row.appendChild(td);
    
    
    var ref2 = query(collection(db, "Books"), where("ISBN", "==", search.value));
    const docSnap = await getDocs(ref2);

    // var ref2 = collection(db, "Books");
    // const docSnap = query(ref2, orderBy("Title", startAt(docSnap2)));

    if(docSnap._snapshot.docChanges.length != 0) {
        console.log(docSnap._snapshot.docChanges.length);

    onSnapshot(ref2, (querySnapshot) => {
        var books = [];

        
        querySnapshot.forEach(doc => {
        books.push(doc.data());
        });
        

        AddAllItemsTotable(books);
    })

    } else {
        tbody.innerHTML = "";
        tbody.appendChild(row);
    }
}

search.addEventListener('keyup', () => {
    if (search.value == "") {
        GetAllDataRealTime();
    } else {
        // return;
        getDataByISBN();
    }
})

async function getDataByTitle() {

    let row = document.createElement("tr");
    let td = document.createElement('td');
    let rr = document.getElementsByClassName('rr');

    td.innerHTML = 'لا توجد بيانات';

    row.appendChild(td);


    var ref2 = query(collection(db, "Books"), where("Title", "==", search2.value));
    const docSnap = await getDocs(ref2);

    // var ref2 = collection(db, "Books");
    // const docSnap = query(ref2, orderBy("Title", startAt(docSnap2)));

    if(docSnap._snapshot.docChanges.length != 0) {
        console.log(docSnap._snapshot.docChanges.length);

        onSnapshot(ref2, (querySnapshot) => {
        var books = [];

        
        querySnapshot.forEach(doc => {
        books.push(doc.data());
        });
        

        AddAllItemsTotable(books);
        })

    } else {
        tbody.innerHTML = "";
        tbody.appendChild(row);
    }
}

search2.addEventListener('keyup', () => {
if (search2.value == "") {
    GetAllDataRealTime();
} else {
    // return;
    getDataByTitle();
}
})



let active = document.getElementById('active');
let deactive = document.getElementById('deactive');

async function getDataByFilter() {

    let row = document.createElement("tr");
    let td = document.createElement('td');
    let rr = document.getElementsByClassName('rr');

    td.innerHTML = 'لا توجد بيانات';

    row.appendChild(td);

    var status;

    if (deactive.checked == true) {
        status = false;
    } else {
        status = true;
    }


    var ref2 = query(collection(db, "Books"), where("Status", "==", status));
    const docSnap = await getDocs(ref2);

    // var ref2 = collection(db, "Books");
    // const docSnap = query(ref2, orderBy("Title", startAt(docSnap2)));

    if(docSnap._snapshot.docChanges.length != 0) {
        console.log(docSnap._snapshot.docChanges.length);

    onSnapshot(ref2, (querySnapshot) => {
        var books = [];

        
        querySnapshot.forEach(doc => {
        books.push(doc.data());
        });
        

        AddAllItemsTotable(books);
    })

    } else {
        tbody.innerHTML = "";
        tbody.appendChild(row);
    }

}

deactive.onclick = function () {
    if (deactive.checked == true) {
        active.checked = false;
        getDataByFilter();
    } else {
        
        GetAllDataRealTime();
    }
}

active.onclick = function () {
    if (active.checked == true) {
        deactive.checked = false;
        getDataByFilter();
    } else {
        GetAllDataRealTime();
    }
}

//GET All Data

async function GetAllDataRealTime() {
    const dbRef = collection(db, "Books");

    onSnapshot(dbRef, (querySnapshot) => {
        var books = [];

        querySnapshot.forEach(doc => {
        books.push(doc.data());
        });

        AddAllItemsTotable(books);
    })
}

window.onload = async function() {
if (localStorage.getItem('user') != null && localStorage.getItem('pass') != null) {
    let em = document.getElementById('em');

var ref = doc(db, "Employees", localStorage.getItem('user'));

const docSnap = await getDoc(ref);

if(docSnap.exists()) {
    if (docSnap.data().Status == true) {
        GetAllDataRealTime();
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

window.onclose = function() {
    if (sessionStorage.getItem('user') != null) {
        window.sessionStorage.removeItem('user');
        window.sessionStorage.removeItem('pass');
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
