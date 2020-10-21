
var firebaseConfig = {
    apiKey: "AIzaSyAy5iNS-gTU6zebHHpNTssfx59-DHAX6EY",
    authDomain: "mandirv1.firebaseapp.com",
    databaseURL: "https://mandirv1.firebaseio.com",
    projectId: "mandirv1",
    storageBucket: "mandirv1.appspot.com",
    messagingSenderId: "107485170358",
    appId: "1:107485170358:web:1dfe3874325921d9a5b417",
    measurementId: "G-8P645R5PEW"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics;



const auth = firebase.auth();




var getCount = 0;




database = firebase.database();
var ref = database.ref('Event Information/');
ref.on('value', gotdata, errdata);





function gotdata(data) {
    const db = data.val();
    const keys = Object.keys(db);
    console.log(keys);

    const g = document.getElementById("getEventInformation");

    if(getCount ===0){

        for (let i = 0; i < keys.length; i++) {
            var k = keys[i];

            var name = db[k].Name;
            var day = db[k].Day;
            var date = db[k].Date;
            var time = db[k].Time;


            var e = document.createElement('tr');

            var nameColumn = document.createElement('td');
            var dayColumn = document.createElement('td');
            var dateColumn = document.createElement('td');
            var timeCloumn = document.createElement("td");


            nameColumn.classList.add("text-center");
            dayColumn.classList.add("text-center");
            dateColumn.classList.add("text-center");
            timeCloumn.classList.add("text-center");

            nameColumn.innerText = name;
            dayColumn.innerText = day;
            dateColumn.innerText = date;
            timeCloumn.innerText = time;



            e.appendChild(dateColumn);
            e.appendChild(dayColumn);
            e.appendChild(timeCloumn);
            e.appendChild(nameColumn);




            g.appendChild(e);


        }
        getCount = 1;


    }
    else{
        var k = keys[keys.length - 1];
        var name = db[k].Name;
        var day = db[k].Day;
        var date = db[k].Date;
        var time = db[k].Time;


        var e = document.createElement('tr');

        var nameColumn = document.createElement('td');
        var dayColumn = document.createElement('td');
        var dateColumn = document.createElement('td');
        var timeColumn = document.createElement("td");


        nameColumn.classList.add("text-center");
        dayColumn.classList.add("text-center");
        dateColumn.classList.add("text-center");
        timeCloumn.classList.add("text-center");


        nameColumn.innerText = name;
        dayColumn.innerText = day;
        dateColumn.innerText = date;
        timeCloumn.innerText = time;



        e.appendChild(dateColumn);
        e.appendChild(dayColumn);
        e.appendChild(timeCloumn);
        e.appendChild(nameColumn);



        g.appendChild(e);

    }


}



function errdata(){
    console.log(data);

}


















function check(){



    var email = document.getElementById("InputEmail");
    var password = document.getElementById("InputPassword");


    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            sessionStorage.setItem("LogIn", true);
            location.href = "Admin.html";

        }
        else{
            sessionStorage.setItem("LogIn", null);

        }
    });

}







