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



import {getFirestore, doc, documentId, Timestamp, getDoc, collectionGroup, getDocs, collection, onSnapshot, startAt, query, orderBy, startAfter, endAt, endBefore, where}
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import {getDatabase, ref, set, child, get, }
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const db = getFirestore();



const db2 = getDatabase();

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


    // const dbref2 = ref(db2);

    // get(child(dbref2, "AdminList/")).then((snapshot) => {

    // // console.log(snapshot.val().admin.Password);

    // if ((localStorage.getItem(md5('user')) != md5(snapshot.val().admin.Username) || localStorage.getItem(md5('pass')) != md5(snapshot.val().admin.Password))  && (sessionStorage.getItem(md5('user')) != md5(snapshot.val().admin.Username) || sessionStorage.getItem(md5('pass')) != md5(snapshot.val().admin.Password))) {
    //     window.location = "login.html";
        
    // } else {
    //     GetAllDataRealTime();
    //     document.body.style.display = 'block';
    //     // const dbRef = query(collectionGroup(db, 'Orders'), where('status', '==', 'تحت المراجعة'));
    //     // const querySnapshot =  getDocs(dbRef);
    //     // querySnapshot.forEach(doc => {
    //     //     console.log(doc.id, ' => ', doc.data());
    //     // });
    //     // console.log(dbRef);
    // //     const dbRef = collectionGroup(db, 'Orders');
    // //     onSnapshot(dbRef, (querySnapshot) => {
    // //     var books = [];

    // //     querySnapshot.forEach(doc => {
    // //     console.log(doc.data());
    // //     });
    // // })

    // }

    // }).catch((error) => {
    //     console.error(error);
    // });

}

var tbody = document.getElementById('tbody1');

function AddItemTotable(id, date_created, payment_method, status, total_price, phoneNumber){
    globalThis.trow = document.createElement("tr");
    trow.className = "rr";

    let td0 = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    // let td7 = document.createElement('td');

    td0.innerHTML = `<a href='view-order.html?id=${id}?phone=${phoneNumber}'><img src="search.png"></a>`
    td1.innerHTML = id;
    // td2.innerHTML = Timestamp.toDate(new Date(date_created)),
    td2.innerHTML = date_created?.toDate().getFullYear()+'-'+(date_created?.toDate().getMonth()+1)+'-'+date_created?.toDate().getDate();
    // date_created.toDate().getFullYear()+'-'+(date_created.toDate().getMonth()+1)+'-'+date_created.toDate().getDate();
    td3.innerHTML = phoneNumber;
    td4.innerHTML = status;
    td5.innerHTML = payment_method;
    td6.innerHTML = total_price;
    // td7.innerHTML = total_price;

    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    // trow.appendChild(td7);

    tbody.appendChild(trow);
}

function AddAllItemsTotable(Ord) {
    tbody.innerHTML = "";
    
    Ord.forEach(element => {
                AddItemTotable(element.id, element.date_created, element.payment_method, element.status, element.total_price, element.phoneNumber);
            });
}

 async function GetAllDataRealTime() {
    
    const dbRef = collectionGroup(db,'Orders');
    // const dbRef2 = collection(db,'/Users/0912345678/Orders');
    
    var orders = [];
    var numbers = [];
    var ids = [];


    onSnapshot(dbRef, (querySnapshot) => { 
        querySnapshot.forEach(doc => {
            // console.log(doc.id);
            orders.push(doc.data());
            numbers.push(doc._document.key.path.segments[6]);
            ids.push(doc.id);
        });
        orders.forEach(d => {
            for(let i in numbers){
                orders[i].phoneNumber = numbers[i];
            }
        });
        orders.forEach(d => {
            for(let i in ids){
                orders[i].id = ids[i];
            }
        });
        console.log(orders);
        AddAllItemsTotable(orders);
    })

    // var cus = [];
    // var a = [];

    // onSnapshot(dbRef, (q) => {
    //     q.forEach(d => {
    //         // cus.push(d.data());
    //         console.log(d.data());
    //         const dbRef2 = collection(db,`/Users/${d.data().phoneNumber}/Orders`);
    //         onSnapshot(dbRef2, (p) => { 
    //             p.forEach(n => { 
    //                 console.log(n.data());
    //                 // ord.push(n.data());
    //             });
    //         })
    //     });
    //     // console.log(cus[0]);
    //     // console.log(ord);
    //     // AddAllItemsTotable(cus, ord);
    // })

    // cus.forEach(n => {
    //     const dbRef2 = collection(db,`/Users/${n.phoneNumber}/Orders`);
    //     onSnapshot(dbRef2, (p) => {
    //         p.forEach(s => {
    //             ord.push(s.data());
    //         })
    //     })
    // });
    // console.log(ord);

    // onSnapshot(dbRef, (querySnapshot) => {
        
    //     querySnapshot.forEach(docc => {
    //         ord.push(docc.data());
    //         a.push(docc._key.path.segments[6]);
    //     });
    //     console.log(a);
    //     AddAllItemsTotable(ord, cus);
    // })

    // onSnapshot(dbRef2, (q) => {
    //     // let i =0;
    //     console.log(q._snapshot.docChanges[0].doc.data.value.mapValue.fields.phoneNumber);
    //     for (let j=0; j<q._snapshot.docChanges.length; j++) {
    //         for (let i=0; i<a.length; i++) {
    //             console.log(a[i]);
    //             if (String(q._snapshot.docChanges[j].doc.data.value.mapValue.fields.phoneNumber) === a[i]) {
    //             cus.push(q._snapshot.docChanges[j].doc.data);
    //             // i+=1;
    //         } else {
    //             // i+=1;
    //             return 0;
    //         }
    //         }
            
    //     }
    //     AddAllItemsTotable(ord, cus);
    //     console.log(cus);
    // })

    // onSnapshot(dbRef, (querySnapshot) => {
    //     var ord = [];
    //     var cus = [];
    //     querySnapshot.forEach(async docc => {
    //         // ord.push(docc.data());
    //         // console.log(docc.data());
    //         // const unsub = onSnapshot(doc(db, "Users", docc._key.path.segments[6]), (d) => {
    //         //     // console.log("Current data: ", d.data());
    //         //     cus.push(d.data());
    //         // });

    //         const q = query(collection(db, "Users"), where("phoneNumber", "==", docc._key.path.segments[6]));
    //         const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         // const cities = [];
    //         querySnapshot.forEach((d) => {
    //             cus.push(docc.data(), d.data());
    //         });
    //         // console.log("Current cities in CA: ", cities.join(", "));
    //         });
            
    //     });
    //     console.log(cus);
    //     AddAllItemsTotable(cus);
    // })
}

let search = document.getElementById('search');

async function getDataBySearch() {

    let row = document.createElement("tr");
    let td = document.createElement('td');
    let rr = document.getElementsByClassName('rr');

    td.innerHTML = 'لا توجد بيانات';

    row.appendChild(td);


    var ref2 = query(collectionGroup(db, "Orders"), where('id', "==", search.value));
    const docSnap = await getDocs(ref2);

    // var ref2 = collection(db, "Books");
    // const docSnap = query(ref2, orderBy("Title", startAt(docSnap2)));

    if(docSnap._snapshot.docChanges.length != 0) {
        console.log(docSnap._snapshot.docChanges.length);

    onSnapshot(ref2, (querySnapshot) => {
        var ord = [];
        var ph = [];
        var id_s = [];

        
        querySnapshot.forEach(doc => {
        ord.push(doc.data());
        ph.push(doc._document.key.path.segments[6]);
        id_s.push(doc.id);
        });
        ord.forEach(d => {
            for(let i in ph){
                ord[i].phoneNumber = ph[i];
            }
        });
        ord.forEach(d => {
            for(let i in id_s){
                ord[i].id = id_s[i];
            }
        });

        AddAllItemsTotable(ord);
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
        getDataBySearch();
    }
})

let review = document.getElementById('review');
let delivering = document.getElementById('delivering');
let delivered = document.getElementById('delivered');
let rejected = document.getElementById('rejected');

async function getDataByFilter() {

                let row = document.createElement("tr");
                let td = document.createElement('td');
                let rr = document.getElementsByClassName('rr');

                td.innerHTML = 'لا توجد بيانات';

                row.appendChild(td);

                var status;

                if (review.checked == true) {
                    status = 'تحت المراجعة';
                } else if(delivering.checked == true){
                    status = 'قيد التوصيل';
                } else if (delivered.checked == true) {
                    status = 'تم الاستلام';
                } else {
                    status = 'ملغية';
                }


                var ref2 = query(collectionGroup(db, "Orders"), where("status", "==", status));
                const docSnap = await getDocs(ref2);

                // var ref2 = collection(db, "Books");
                // const docSnap = query(ref2, orderBy("Title", startAt(docSnap2)));

                if(docSnap._snapshot.docChanges.length != 0) {
                    console.log(docSnap._snapshot.docChanges.length);

                onSnapshot(ref2, (querySnapshot) => {
                    var ord = [];
                    var ph = [];
                    var id_s = [];
            
                    
                    querySnapshot.forEach(doc => {
                    ord.push(doc.data());
                    ph.push(doc._document.key.path.segments[6]);
                    id_s.push(doc.id);
                    });
                    ord.forEach(d => {
                        for(let i in ph){
                            ord[i].phoneNumber = ph[i];
                        }
                    });
                    ord.forEach(d => {
                        for(let i in id_s){
                            ord[i].id = id_s[i];
                        }
                    });

                    AddAllItemsTotable(ord);
                })

                } else {
                    tbody.innerHTML = "";
                    tbody.appendChild(row);
                }

            }

            review.onclick = function () {
                    if (review.checked == true) {
                        delivering.checked = false;
                        delivered.checked = false;
                        rejected.checked = false;
                        getDataByFilter();
                    } else {
                        
                        GetAllDataRealTime();
                    }
                }

            delivering.onclick = function () {
                    if (delivering.checked == true) {
                        review.checked = false;
                        delivered.checked = false;
                        rejected.checked = false;
                        getDataByFilter();
                    } else {
                        GetAllDataRealTime();
                    }
            }

            delivered.onclick = function () {
                if (delivered.checked == true) {
                    delivering.checked = false;
                    review.checked = false;
                    rejected.checked = false;
                    getDataByFilter();
                } else {
                    GetAllDataRealTime();
                }
            }

            rejected.onclick = function () {
                if (rejected.checked == true) {
                    delivering.checked = false;
                    review.checked = false;
                    delivered.checked = false;
                    getDataByFilter();
                } else {
                    GetAllDataRealTime();
                }
            }

            function Signout() {
                if (sessionStorage.getItem(md5('user')) != null) {
                    window.sessionStorage.removeItem(md5('user'));
                    window.sessionStorage.removeItem(md5('pass'));
                }
                window.localStorage.removeItem(md5('user'));
                window.localStorage.removeItem(md5('pass'));
                window.localStorage.removeItem('keepLogIn');
                window.location = 'login.html';
            }
