var i = 0;
db.collection("users").orderBy("score","desc").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        var li1 = document.createElement('li');
        li1.innerHTML = ++i;
        li1.className = 'rank';
        var li2 = document.createElement('li');;
        li2.innerHTML = doc.data().name;
        li2.className = 'playerName';
        var li3 = document.createElement('li');;
        li3.innerHTML = doc.data().score;
        li3.className = 'playerScore';
        var div = document.createElement('div');
        div.appendChild(li1);
        div.appendChild(li2);
        div.appendChild(li3);
        div.className = 'result';
        document.getElementById('results').appendChild(div);
    });
});
