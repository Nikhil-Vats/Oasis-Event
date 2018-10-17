var y_score = document.getElementById('y_score');
var t_score = document.getElementById('t_score');
var name = document.getElementById('name_input');
var loader = document.getElementsByClassName('fetching')[0];

db.collection("users")
.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        y_score.innerHTML = doc.data().score;
        loader.style.transform = 'scale(0)';
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});