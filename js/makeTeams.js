
// function makeTeams() {
    var groupA = []; 
    var groupB = [];
    var groupC = [];
    var groupD = [];
    var groupA1;
    var groupA2;
    var groupA3;
    var groupA4;
    var group;
    db.collection("users")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                console.log(doc.data().group);
                group = Number(doc.data().group);
                group = Math.floor(group/10000);
                // alert(group);
                if(group == 1) {
                    // alert(1);
                    groupA.push(doc.data().name);
                }
                if(group == 2) {
                    // alert(2);
                    groupB.push(doc.data().name);
                }
                if(group == 3) {
                    // alert(3);
                    groupC.push(doc.data().name);
                }
                if(group == 4) {
                    // alert(4);
                    groupD.push(doc.data().name);
                }
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
  
    setTimeout(function printData() {
    console.log(groupA);
    console.log(groupB);
    console.log(groupC);
    console.log(groupD); },4000);
// }
