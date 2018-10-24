var user1, name, user2, email;
var y_score = document.getElementById('y_score');
var loader = document.getElementsByClassName('fetching')[0];
function signIn() {
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithRedirect(provider);
}


// var promise2 = new Promise(function(resolve,reject) {
//   firebase.auth().getRedirectResult().then(function (result) {
//   if (result.credential) {
//       var token = result.credential.accessToken;
//       console.log('token ' + token);
//   }
//   // The signed-in user info.
//   user2 = result.user;
//   name = user2.displayName;
//   email = user2.email;
//   console.log(user2.displayName);
//   console.log('user ' + user2);
//   resolve(user2);
// }).catch(function (error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   console.log(errorCode);
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   console.log(errorMessage);
//   var email = error.email;
//   console.log(email);
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   console.log(credential);
//   // ...
// });
// });

firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        console.log(user);
        user1 = user;
        createUser(user1);
    } else {
       console.log('User login failed');
    }
});

// promise2.then(function (user2) {
    function createUser(user1) {
  var newUser = 0;
  db.collection("users").doc(user1.displayName)
  .get()
  .then(function(doc) {
        if(doc.data()) {
            console.log('doc exists');
        }
        else {
            newUser = 1;
        }
        console.log(doc.id, " => ", doc.data());
   })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
  if(newUser == 1) {
      db.collection("users").doc(user1.displayName).set({
        name: name,
        email: email,
        score: 0,
        chapter_status: 1
      }).then(function() {
        console.log("Document successfully written!");
            y_score.innerHTML = 0;
            // name_space.innerHTML = name;
            loader.style.transform = 'scale(0)';
            // var current_url = window.location.href;
            // var new_url = current_url.split("_")[0] + "_" + i + ".html";
            window.location.href = 'https://nikhilphalange.github.io/chapter_1.html';
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
  }   
  else {
      db.collection("users").doc(user1.displayName)
      .get()
      .then(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              y_score.innerHTML = doc.data().score;
              loader.style.transform = 'scale(0)';
              window.location.href = 'nikhilphalange.github.io/chapter_' + doc.data().chapter_status + '.html';
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }  
}
// });




