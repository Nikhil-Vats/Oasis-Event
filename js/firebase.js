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
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().languageCode = 'pt';
  firebase.auth().useDeviceLanguage();

  function signIn () {
  firebase.auth().signInWithRedirect(provider);
  }  
  
var db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

function submitEvent() {
    var name = document.getElementById('name_input').value;
    db.collection("users").doc().set({
        name: name,
        is_allotted: false,
        score: 0,
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

app_fireBase = firebase;
// db.collection("sports")
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             // console.log(doc.id, " => ", doc.data());
//             var sum = 0;
//             sum = parseInt(doc.data().match_type) * 1000 + Number(doc.data().is_gender) * 100 + parseInt(doc.id) + 1;
//             // console.log(sum);

//             // console.log(sum%100);
//             sport_map.set(doc.id,doc.data().sport_name);
//             $("#sport-result").append("<option>" + doc.data().sport_name + "</option>");
//             $("#sport").append("<option value=" + sum + ">" + doc.data().sport_name + "</option>");
//             if(doc.data().match_type)
//               $("#match").append("<option>" + doc.data().sport_name + "</option>");

//             // doc.data().name;
//         });
//             if(work==2) {
//             document.getElementById('initial3').innerHTML="Fetched data!!";
//             document.getElementById('sport').style.backgroundColor = "#01D63B";
//             document.getElementById('sport').style.color = "white";
//             setTimeout(function () {
//                 document.getElementById('sport').style.backgroundColor = "white";
//                 document.getElementById('sport').style.color = "black";
//                 // document.getElementById('initial2').remove();
//                 $("#sport").append("<option value=''id='initial3' disabled selected>---Select---</option>");
//                 if(document.getElementById('sport').childNodes.length == 1) {
//                     document.getElementById('initial3').remove();
//                     $("#sport").append("<option value=''id='initial2' disabled selected>No events found!</option>");
    
//                 }
//             },1000);
//             if(document.getElementById('sport').childNodes.length == 1) {
//                 document.getElementById('initial3').remove();
//                 $("#sport").append("<option value=''id='initial2' disabled selected>No events found!</option>");

//             }
//             }
//             if(work==1) {
//             document.getElementById('initial2').innerHTML="Fetched data!!";
//             document.getElementById('sport-result').style.backgroundColor = "#01D63B";
//             document.getElementById('sport-result').style.color = "white";
//             setTimeout(function () {
//                 document.getElementById('sport-result').style.backgroundColor = "white";
//                 document.getElementById('sport-result').style.color = "black";
//                 // document.getElementById('initial2').remove();
//                 $("#sport-result").append("<option value=''id='initial2' disabled selected>---Select---</option>");
//                 if(document.getElementById('sport-result').childNodes.length == 1) {
//                     document.getElementById('initial2').remove();
//                     $("#sport-result").append("<option value=''id='initial2' disabled selected>No events found!</option>");
    
//                 }
//             },1000);
//             if(document.getElementById('sport-result').childNodes.length == 1) {
//                 document.getElementById('initial2').remove();
//                 $("#sport-result").append("<option value=''id='initial2' disabled selected>No events found!</option>");

//             }
//         }
//             if(work==3){
//             document.getElementById('initial0').innerHTML="Fetched data!!";
//             document.getElementById('match').style.backgroundColor = "#01D63B";
//             document.getElementById('match').style.color = "white";
//             setTimeout(function () {
//                 document.getElementById('match').style.backgroundColor = "white";
//                 document.getElementById('match').style.color = "black";
//                 // document.getElementById('initial2').remove();
//                 $("#match").append("<option value=''id='initial0' disabled selected>---Select---</option>");
//                 if(document.getElementById('match').childNodes.length == 1) {
//                     document.getElementById('initial0').remove();
//                     $("#match").append("<option value=''id='initial0' disabled selected>No events found!</option>");
    
//                 }
//             },1000);
//             if(document.getElementById('match').childNodes.length == 1) {
//                 document.getElementById('initial0').remove();
//                 $("#match").append("<option value=''id='initial0' disabled selected>No events found!</option>");

//             }
//         }
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
//     if(document.getElementById('venueOptions')) {
//         document.getElementById('venueOptions').innerHTML = "";
//         $("#venueOptions").append("<option value='' id='initial3' disabled selected>Fetching data, please wait!</option>");
//         document.getElementById('venueOptions').style.backgroundColor = "#049CE7";
//         document.getElementById('venueOptions').style.color = "white"; 
//         }
  
//     db.collection("venue")
//         .get()
//         .then(function(querySnapshot) {
//             querySnapshot.forEach(function(doc) {
//                 // doc.data() is never undefined for query doc snapshots
//                 console.log(doc.id, " => ", doc.data());

//                 $("#venueOptions").append("<option>" + doc.data().name + "</option>");
//                 // doc.data().name;
//             });
//             document.getElementById('initial3').innerHTML="Fetched data!!";
//             document.getElementById('venueOptions').style.backgroundColor = "#01D63B";
//             document.getElementById('venueOptions').style.color = "white";
//             setTimeout(function () {
//                 document.getElementById('venueOptions').style.backgroundColor = "white";
//                 document.getElementById('venueOptions').style.color = "black";
//                 // document.getElementById('initial2').remove();
//                 $("#venueOptions").append("<option value=''id='initial3' disabled selected>---Select---</option>");
//                 if(document.getElementById('venueOptions').childNodes.length == 1) {
//                     document.getElementById('initial3').remove();
//                     $("#venueOptions").append("<option value=''id='initial3' disabled selected>No events found!</option>");
    
//                 }
//             },1000);
//             if(document.getElementById('venueOptions').childNodes.length == 1) {
//                 document.getElementById('initial3').remove();
//                 $("#venueOptions").append("<option value=''id='initial3' disabled selected>No events found!</option>");

//             }


//         })
//         .catch(function(error) {
//             // console.log("Error getting documents: ", error);
//         });
    
//     var boolean1;
//         db.collection("colleges")
//             .get()
//             .then(function(querySnapshot) {
//                 querySnapshot.forEach(function(doc) {
//                     // doc.data() is never undefined for query doc snapshots
//                     console.log(doc.id, " => ", doc.data());
//                     // if(!doc.data().abbr)
//                     //   $("#collegeName").append("<option>" + doc.data().name + "</option>");
//                     if(doc.data().abbr) {
//                         boolean1 = true;
//                       $("#teamA").append("<option>" + doc.data().name + "</option>");
//                       $("#teamB").append("<option>" + doc.data().name + "</option>");
//                     }
//                 });
               
//             })
//             .catch(function(error) {
//             });
// app_fireBase = firebase;
