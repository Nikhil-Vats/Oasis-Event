var user1, name;
var y_score = document.getElementById('y_score');
var loader = document.getElementsByClassName('fetching')[0];
var name_space = document.getElementById('name_space');
function signIn() {

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithRedirect(provider);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);
      user1 = user;
      alert('Hi this is in if user');
      redirect();
    } else {
      // No user is signed in.
    }
  });

  var user = firebase.auth().currentUser;

if (user != null) {
  alert('Hi this is in if user != null');
  redirect();
  user.providerData.forEach(function (profile) {
    name = profile.displayName;
    alert('Hi this is in in if user != null');
    redirect();
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}
}

function redirect() {
  window.location.href = 'https://nikhilphalange.github.io/Oasis-Event/round1.html';
  createUser();
}

function createUser() {
  var newUser = 0;
  db.collection("users").where("name","==",name)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
    newUser = 1;
  });
  if(newUser == 1) {
      db.collection("users").doc(name).set({
        name: name,
        score: 50,
      }).then(function() {

            y_score.innerHTML = 50;
            name_space.innerHTML = name;
            loader.style.transform = 'scale(0)';
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
  }   
  else {
      db.collection("users").where("name","==",name)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              y_score.innerHTML = doc.data().score;
              name_space.innerHTML = doc.data().name;
              loader.style.transform = 'scale(0)';
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }  
}



