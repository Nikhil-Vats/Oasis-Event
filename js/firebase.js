let vh = window.innerHeight * 0.01;
document.getElementById('loading').style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.getElementById('loading').style.setProperty('--vh', `${vh}px`);
});

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
function getScore(name,email) {
    console.log(name, email);
    db.collection("users").doc(name).get()
    .then(function(doc) {
        console.log(doc);
        console.log(name);
        console.log(email);
        document.getElementById('y_score').innerHTML = doc.data().score;
        document.getElementsByClassName('fetching')[0].style.transform = 'scale(0)';
        if(doc.data().chapter_status == 2) {
            document.getElementById('spanT').style.animation = 'timer 20s linear';
            document.getElementsByClassName('gameover')[0].style.opacity = '1';
            document.getElementsByClassName('gameover')[0].style.animation = 'gameover 20s linear both';
            document.getElementById('stats_txt').style.animation = 'gameover_text 20s linear both';
            document.getElementById('Gameover_cap').style.animation = 'gameover_text 20s linear both';
            document.getElementsByClassName('button')[0].style.animation = 'gameover_text 20s linear both';
        }
    })
    .catch(function(error) {
        window.location.href = 'https://nikhilphalange.github.io/Oasis-Event/index.html';
        // document.getElementsByClassName('fetching')[0].innerHTML = 'Network issue, please check your network connection and refresh!';
        console.log("Error getting documents: ", error);
    });
}
function checkState() {
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        console.log(user);
        user1 = user;
        getScore(user.displayName,user.email);
    } else {
        window.location.href = 'https://nikhilphalange.github.io/Oasis-Event/index.html';
    }
});
}

function checkUser() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
    name = user.displayName;
    email = user.email;
    // photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  
    }
    console.log(user);
}

function checkStatus(i) {
    var status = 0;
    db.collection("users").doc(name)
    .get()
    .then(function(doc) {
        status = doc.data().chapter_status;
        if(i == status) {
            if(document.getElementsByClassName('container')[0])
            document.getElementsByClassName('container')[0].style.display = 'block';
            else if(document.getElementById('menu'))
            document.getElementById('menu').style.display = 'block';
            else if(document.getElementById('app'))
            document.getElementById('app').style.display = 'block';
        }
        else {
            document.getElementsByClassName('fetching')[0].style.display = 'none';
            if(document.getElementsByClassName('container')[0])
            document.getElementsByClassName('container')[0].style.display = 'none' ;
            else if(document.getElementById('menu'))
            document.getElementById('menu').style.display = 'none';
            else if(document.getElementById('app')) {
            document.getElementById('app').style.display = 'block';    
            document.getElementById('launch-screen__title').innerHTML = 'Sorry you are not eligible for this round!';
            var current_url = window.location.href;
            var new_url = current_url.split("_")[0] + "_" + doc.data().chapter_status + ".html";
            window.location.href = new_url;
            document.getElementById('launch-screen__description').style.display = 'none';
            document.getElementById('start-btn').style.display = 'none';
            document.getElementById('status2').style.display = 'block';
            }
            if(i==4) {
                document.getElementsByClassName('container')[0].style.display = 'block' ;
                document.getElementById('canvas').style.display = 'none';
                var current_url = window.location.href;
                var new_url = current_url.split("_")[0] + "_" + doc.data().chapter_status + ".html";
                window.location.href = new_url;
            }
            var current_url = window.location.href;
            var new_url = current_url.split("_")[0] + "_" + doc.data().chapter_status + ".html";
            window.location.href = new_url;
            document.getElementsByClassName('status')[0].style.display = 'block';                                                                                                                                                                                                                                                                                                                                                         

        }
    })
    .catch(function(error) {
        // document.body.style.backgroundColor = 'white';
        // var div = document.createElement('div');
        // div.className = 'error';
        // div.innerHTML = 'Network Error, please check your internet connection!';
        // document.body.appendChild(div);
        console.log("Error getting documents: ", error);
    });
}

function statistics() {
    document.getElementById('pacman').style.display = 'none';
    var score = document.getElementById('Score').innerHTML;
    document.getElementById('game-over-score').innerHTML = score;
    document.getElementById('stats').style.transform = 'scale(1)';
}

function showResult() {
    document.getElementById('stats').style.transform = 'scale(1)';
}

function sendScore(score) {
    db.collection("users").doc(name).set({
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
    document.getElementById('submit_btn').innerHTML = 'Submitting..';
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
                score = score + 20;
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
                score = score + 20;
                // alert(`For question ${i} answer is false`);
                // alert(`Added score 10 for ques ${i},${score}`);
                // console.log(doc.data());
            }
        }
        else if (tapCold[i] == max[i]) {
            value = 3;
            if(answer == 3) {
                score = score + 50;
            }
            else {
                score = score + 20;
            }
        }
        else if (tapDold[i] == max[i]) {
            value = 4;
            if(answer == 4) {
                score = score + 50;
            }
            else {
                score = score + 20;
            }
        }
        console.log('Final score',score);
        
    }

        db.collection("users").doc(name).set({
            name: name,
            score: score,
            chapter_status: 2,
        }, { merge: true }).then(function() {
            console.log("Document successfully written!");
            var current_url = window.location.href;
            var new_url = current_url.split("_")[0] + "_2.html";
            window.location.href = new_url;
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
}    


app_fireBase = firebase;