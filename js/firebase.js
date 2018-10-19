var app_fireBase = {};

var config = {
    apiKey: "AIzaSyDz7s1lXGSVhAEj8TIQSsEjeatPO5h9e2c",
    authDomain: "oasis-event.firebaseapp.com",
    databaseURL: "https://oasis-event.firebaseio.com",
    projectId: "oasis-event",
    storageBucket: "oasis-event.appspot.com",
    messagingSenderId: "1027347694569"
  };

firebase.initializeApp(config);

var db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);
function getScore() {
    db.collection("users").doc("Nikhil")
    .get()
    .then(function(doc) {
        console.log(doc.id, " => ", doc.data());
        document.getElementById('y_score').innerHTML = doc.data().score;
        document.getElementsByClassName('fetching')[0].style.transform = 'scale(0)';
    })
    .catch(function(error) {
        document.getElementsByClassName('fetching')[0].innerHTML = 'Network issue, please check your network connection and refresh!';
        console.log("Error getting documents: ", error);
    });
}

function statistics() {
    document.getElementById('pacman').style.display = 'none';
    var score = document.getElementById('Score').innerHTML;
    document.getElementById('game-over-score').innerHTML = score;
    document.getElementById('stats').style.transform = 'scale(1)';
    sendScore(score);
}

function sendScore(score) {
    db.collection("users").doc("Nikhil").set({
        chapter_score: Number(score),
    }, {merge: true})
    .then(function() {
        alert("done");
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}
var tapAold = [];
var tapBold = [];
var tapCold = [];
var tapDold = [];
var j=1;
var max = [];
function getTaps() {
    for(var i=1;i<=5;i++) {
        db.collection("chapter1").doc(i.toString())
        .get()
        .then(function(doc){
            tapAold[j] = doc.data().tapA;
            tapBold[j] = doc.data().tapB;
            tapCold[j] = doc.data().tapC;
            tapDold[j] = doc.data().tapD;
            max[j] = Math.max(doc.data().tapA,doc.data().tapB,doc.data().tapC,doc.data().tapD);
            j++;
            console.log('milgyi');
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
}
function submitEvent() {
    var score = 0;
    for(var i=1;i<=5;i++) {
        var answer;
        var options = document.getElementsByClassName('Options'+[i]);
        var tapANew = 0;
        var tapBNew = 0;
        var tapCNew = 0;
        var tapDNew = 0;
        var value;
        for(var j=0;j<=3;j++) {
            // alert(options[j]);
            if(options[j].checked) {
                answer = options[j].value;   
                // alert(`Answer is ${answer}`);         
            }
        }
        if(answer == 1) {
            tapANew = 1;
        }
        else if(answer == 2) {
            tapBNew = 1;
        }
        else if(answer == 3) {
            tapCNew = 1;
        }
        else if(answer == 4) {
            tapDNew = 1;
        }

        db.collection("chapter1").doc(i.toString())
        .set({
            tapA : tapAold[i] + tapANew,
            tapB : tapBold[i] + tapBNew,
            tapC : tapCold[i] + tapCNew,
            tapD : tapDold[i] + tapDNew,
        }, {merge: true})
        .then(function(doc){
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });



        if(tapAold[i] == max[i]) {
            value = 1;
            if(answer == 1) {
                // alert(`Value is ${value}`);
                // alert(`For question ${i} answer is correct`);
                score = score + 50;
                // alert(`Added score 50 for ques ${i},${score}`);
                // console.log(doc.data());
            }
            else {
                score = score + 10;
                // alert(`For question ${i} answer is false`);
                // alert(`Added score 10 for ques ${i},${score}`);
                // console.log(doc.data());
            }
        }
        else if (tapBold[i] == max[i] ) {
            value = 2;
            if(answer == 2) {
                // alert(`Value is ${value}`);
                // alert(`For question ${i} answer is correct`);
                score = score + 50;
                // alert(`Added score 50 for ques ${i},${score}`);
                // console.log(doc.data());
            }
            else {
                score = score + 10;
                // alert(`For question ${i} answer is false`);
                // alert(`Added score 10 for ques ${i},${score}`);
                // console.log(doc.data());
            }
        }
        else if (tapCold[i] == max[i]) {
            value = 3;
            if(answer == 3) {
                // alert(`Value is ${value}`);
                // alert(`For question ${i} answer is correct`);
                score = score + 50;
                // alert(`Added score 50 for ques ${i},${score}`);
                // console.log(doc.data());
            }
            else {
                score = score + 10;
                // alert(`For question ${i} answer is false`);
                // alert(`Added score 10 for ques ${i},${score}`);
                // console.log(doc.data());
            }
        }
        else if (tapDold[i] == max[i]) {
            value = 4;
            if(answer == 4) {
                // alert(`Value is ${value}`);
                // alert(`For question ${i} answer is correct`);
                score = score + 50;
                // alert(`Added score 50 for ques ${i},${score}`);
                // console.log(doc.data());
            }
            else {
                score = score + 10;
                // alert(`For question ${i} answer is false`);
                // alert(`Added score 10 for ques ${i},${score}`);
                // console.log(doc.data());
            }
        }
        console.log('Final score',score);
        
    }

        db.collection("users").doc("Nikhil").set({
            name: "Nikhil_new",
            score: score,
        }, { merge: true }).then(function() {
            console.log("Document successfully written!");
            window.location.href = 'file:///C:/Users/Dell/Desktop/Oasis%20Event/chapter2.html';
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }    


app_fireBase = firebase;