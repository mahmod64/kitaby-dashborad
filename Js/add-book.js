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

import {getStorage, ref as sRef, uploadBytes, uploadBytesResumable, getDownloadURL} 
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

const db = getFirestore();

let isbn = document.getElementById('isbn');
let title = document.getElementById('title');
let author = document.getElementById('author');
let publisher = document.getElementById('publisher');
let pcount = document.getElementById('pcount');
let edition = document.getElementById('edition');
let descreption = document.getElementById('descreption');
let quantity = document.getElementById('quantity');
let cate = document.getElementById('cate');
let price =  document.getElementById('price');

let addbtn = document.getElementById('addbtn');
let upload = document.getElementById('upload');

var files = [];
var reader = new FileReader();


var nbox = document.getElementById('nbox');
var extlab = document.getElementById('extlab');
var myimg = document.getElementById('myimg');
var sel = document.getElementById('sel');

var input = document.createElement('input');
input.type = 'file';

input.onchange = e =>{
files = e.target.files;

var extention = GetFileExt(files[0]);
var namee = GetFileName(files[0]);

nbox.innerHTML = namee;
extlab.innerHTML = extention;

reader.readAsDataURL(files[0]);
}

reader.onload = function() {
myimg.src = reader.result;
}

sel.onclick = function() {
input.click();
}

function GetFileExt(file) {
var temp = file.name.split('.');
var ext = temp.slice(temp.length-1, temp.length);
return '.' + ext[0];
} 

function GetFileName(file){
var temp = file.name.split('.');
var fname = temp.slice(0, -1).join('.');
return fname;
}

async function UploadPro() {
        var ImgToUp = files[0];

        var ImgName = nbox.innerHTML + extlab.innerHTML;

        const metaData = {
            contentType:ImgToUp.type
        }

        const storage = getStorage();

        const StorageRef = sRef(storage, "Images/"+ImgName);

        const UploadTask = uploadBytesResumable(StorageRef, ImgToUp, metaData);

        UploadTask.on('state.change', (snapshot)=> {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload " + progress + "%");
            this.imageUrl = snapshot.downloadURL;
        },
        (error) => {
            alert("Image Not Uploaded");
        },
        ()=> {
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                // add_Book(downloadURL);
                localStorage.setItem("url", downloadURL);
            });
        }
        );
      }

    //   upload.addEventListener('click', UploadPro);

async function add_Book(){

    if (isbn.value != "" && title.value != "" && author.value != "" && publisher.value != "" && pcount.value != "" && price.value != "" && quantity.value != "" && cate.value != "" && input.value != "" && descreption.value != "") {

    if (isbn.value.length == 13) {
        if (localStorage.getItem("url") != null) {
    var cover_url = localStorage.getItem("url") != null? localStorage.getItem("url"): "";

    var ref = doc(db, "Books", isbn.value);

    const docSnap = await getDoc(ref);

    if(docSnap.exists()) {
    alert('الكتاب موجود مسبقا');
    location.reload();
    } 

    else {
        await setDoc(
            ref, {
                ISBN: isbn.value,
                Title: title.value,
                Author: author.value,
                Publisher: publisher.value,
                Page_Count: Number(pcount.value),
                Edition: edition.value,
                Descreption: descreption.value,
                Cover_Image_url: cover_url,
                Quantity: Number(quantity.value),
                Category: cate.value,
                Price: Number(price.value),
                Status: true
            }
        )
        .then(()=> {
            alert('تمت إضافة الكتاب');
            window.location.reload();
            // localStorage.removeItem("url");
        })
        .catch((error)=> {
            alert('Unsuccessfully Operatin, error'+error);
        });
        localStorage.removeItem("url");
    }
    } else {
        myimg.style.boxShadow = "0px 0px 0px 2px #ff0119b8";
        upload.style.boxShadow = "0px 0px 0px 2px #ff0119b8";
        alert('يجب تحميل الصورة قبل الإضافة');
    }
    } else {
        isbn.style.boxShadow = "0px 0px 0px 2px #ff0119b8";
        alert('يجب أن يحتوي حقل ردمك علي 13 رقم');
    }
} else {
    let e = document.getElementsByClassName('req');
    
    for (var i = 0; i < e.length; i++) {
        e[i].style.boxShadow ="0px 0px 0px 2px #ff0119b8";
    } 

    alert('يجب تعبئة الحقول المطلوبة');
}
}

window.onload = async function() {
    if (localStorage.getItem('user') != null && localStorage.getItem('pass') != null) {

        // console.log(isbn.value.length);
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

 addbtn.addEventListener('click', add_Book);
 upload.addEventListener('click', UploadPro);

// addbtn.addEventListener('click', () => {
//         // UploadPro();
//         add_Book();
// });

// addbtn.addEventListener('click', () => {
//     if (localStorage.getItem("url") === null) {
//         return 0;
//     } else {
//         UploadPro();
//     }
// });

