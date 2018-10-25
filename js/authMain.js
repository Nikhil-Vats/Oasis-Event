var user1, name, user2, email;
var y_score = document.getElementById('y_score');
var loader = document.getElementsByClassName('fetching')[0];
function signIn() {
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithRedirect(provider);
}

firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        console.log(user);
        user1 = user;
        createUser(user1);
    } else {
    console.log('User login failed');
    }
});


function createUser(user1) {
    var url = window.location.href;
    var no = url.split("_")[1] - ".html";
    console.log(no);
    console.log(user1.displayName);
    console.log(user1.email);
  var newUser = 0;
  db.collection("users").doc(user1.displayName)
  .get()
  .then(function(doc) {
        if(doc.data()) {
            db.collection("users").doc(user1.displayName)
            .get()
            .then(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    if(doc.data().chapter_status == Number(no)) {
                        console.log('Right page');
                    }
                    else
                    window.location.href = 'https://nikhilphalange.github.io/Oasis-Event/chapter_' + doc.data().chapter_status + '.html';
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        }
        else {
            db.collection("users").doc(user1.displayName).set({
                name: user1.displayName,
                email: user1.email,
                score: 0,
                chapter_status: 1
              }).then(function() {
                console.log("Document successfully written!");
                    window.location.href = 'https://nikhilphalange.github.io/Oasis-Event/chapter_1.html';
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        }
        console.log(doc.id, " => ", doc.data());
   })
  .catch(function(error) {
    db.collection("users").doc(user1.displayName).set({
        name: user1.displayName,
        email: user1.email,
        score: 0,
        chapter_status: 1
      }).then(function() {
        console.log("Document successfully written!");
            window.location.href = 'https://nikhilphalange.github.io/Oasis-Event/chapter_1.html';
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    console.log("Error getting documents: ", error);
  });
}