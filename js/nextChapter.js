function nextChapter() {
    var new_score = Number(document.getElementById('y_score').innerHTML) + Number(document.getElementById('game-over-score').innerHTML);
    db.collection("users").doc("Nikhil").set({ score: new_score }, { merge: true }).then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}