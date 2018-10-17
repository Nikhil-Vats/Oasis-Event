function signIn() {

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithRedirect(provider);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);
    } else {
      // No user is signed in.
    }
  });

  var user = firebase.auth().currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}
}