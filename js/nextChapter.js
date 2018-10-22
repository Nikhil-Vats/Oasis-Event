function nextChapter(i) {
    var new_score = Number(document.getElementById('y_score').innerHTML) + Number(document.getElementById('game-over-score').innerHTML);
    db.collection("users").doc("Nikhil").set({ score: new_score, chapter_status: i }, { merge: true }).then(function() {
        console.log("Document successfully written!");
        var current_url = window.location.href;
        var new_url = current_url.split("_")[0] + "_" + i + ".html";
        window.location.href = new_url;
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}