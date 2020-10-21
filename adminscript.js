
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


var EventDeleteId = 0;
var DonarDeleteId = 0;


var EventKeys = [];
var Eventind = [];
var EventCount = 0;


var DonarKeys = [];
var Donarind = [];
var DonarCount = 0;




if(sessionStorage.getItem("LogIn") === null){
    location.href = "Index.html";
}
else{
    //Printing the Data
    database = firebase.database();
    var donarref = database.ref('Donar Information/');
    donarref.on('value', Donargotdata, Donarerrdata);

    var eventref = database.ref('Event Information/');
    eventref.on('value',Eventgotdata, Eventerrdata );
    //Four function Donargotdata Donaterrdata Eventgotdata Eventerrdata is for printing from the firebase


    //Two functions AddEvent and AddDonar is for adding the data into firebase and updates the table in admin pannel


}


function AddEvent(){

    const name = document.getElementById("EventName");
    const date = document.getElementById("EventDate");
    const time = document.getElementById("EventTime");


    if(name.value === ""){
        alert("Enter the Name");
    }
    else if(date.value === ""){
        alert("Enter the Date");
    }
    else if(time.value ===""){
        alert("Enter the Time");
    }
    else{
        EventCount = 2;
        var e = ["January ", "February ","March " , "April ", "May ", "June ", "July ", "August ", "September ", "October ", "November ", "December "];

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dateString = e[parseInt(date.value[5] + date.value[6])  -1] + date.value[8] + date.value[9] + "," + date.value[0]+date.value[1]+date.value[2]+date.value[3]

        d = new Date(dateString);
        var dateformating = date.value[8] + date.value[9] + " "+ e[parseInt(date.value[5] + date.value[6])  -1] + date.value[0]+date.value[1]+date.value[2]+date.value[3]


        var gettime = time.value
        var timeformatting = "";


        if(parseInt(gettime[0] + gettime[1]) === 12){
            timeformatting = 12 + gettime[2] + gettime[3] + gettime[4] +  " PM";
        }
        else if(parseInt(gettime[0] + gettime[1]) === 0){
            timeformatting = 12 + gettime[2] + gettime[3] + gettime[4] +  " AM";

        }
        else if(parseInt(gettime[0] + gettime[1]) >12){
            timeformatting = String(parseInt(gettime[0] + gettime[1]) - 12) + gettime[2] + gettime[3] + gettime[4] +  " PM";


        }
        else{
            timeformatting = String(parseInt(gettime[0] + gettime[1])) + gettime[2] + gettime[3] + gettime[4] +  " AM";
        }



        const database = firebase.database();

        var Eventref = database.ref('Event Information/');

        var data = {
            Name : name.value,
            Date: dateformating,
            Day: days[d.getDay()],
            Time: timeformatting
        }

        Eventref.push(data);
        console.log("pushed");

    }


}




function AddDonar(){

    const name = document.getElementById("DonarName");
    const amount = document.getElementById("DonarAmount");
    const date = document.getElementById("DonarDate");



    if(name.value === ""){
        alert("Enter the Name");
    }
    else if(amount.value === "") {
        alert("Enter the Amount");
    }
    else if(date.value === ""){
        alert("Enter the Date");
    }
    else{
        DonarCount = 2;
        const database = firebase.database();

        var Donarref = database.ref('Donar Information/');


        var e = ["January ", "February ","March " , "April ", "May ", "June ", "July ", "August ", "September ", "October ", "November ", "December "];
        var dateformating = date.value[8] + date.value[9] + " "+ e[parseInt(date.value[5] + date.value[6])  -1] + date.value[0]+date.value[1]+date.value[2]+date.value[3]


        var data = {
            Name : name.value,
            Date: dateformating,
            Amount: amount.value

        }

        Donarref.push(data);




    }


}



function EventDeleter(){

    this.remove();
    firebase.database().ref('Event Information/'+  EventKeys[this.id]).remove();
}

function DonarDeleter(){
    this.remove();
    firebase.database().ref('Donar Information/'+  DonarKeys[this.id]).remove();




}


function Donargotdata(data){
    const db = data.val();
    const keys = Object.keys(db);
    console.log(keys);

    const donartable = document.getElementById("DonarTable");

    if(DonarCount === 0) {

        const hd1 = document.createElement("tr");
        const hd2 = document.createElement("th");
        const hd3 = document.createElement("th");
        const hd4 = document.createElement("th");
        const hd5 = document.createElement("th");

        hd2.innerText = "DONAR NAME";
        hd1.appendChild(hd2);
        hd3.innerText = "DONAR AMOUNT";
        hd1.appendChild(hd3);
        hd4.innerText = "DONAR DATE";
        hd1.appendChild(hd4);
        hd5.innerText="INSTRUCTION";
        hd1.appendChild(hd5);

        donartable.appendChild(hd1);



        for (let i = 0; i < keys.length; i++) {
            var k = keys[i];
            var name = db[k].Name;
            var amount = db[k].Amount;
            var date = db[k].Date;


            const e = document.createElement("tr");
            const a = document.createElement("td");
            const b = document.createElement("td");
            const c = document.createElement("td");
            const d = document.createElement("td");
            DonarKeys.push(k);
            Donarind.push(DonarDeleteId);

            e.id = DonarDeleteId;
            DonarDeleteId++;

            e.onclick = DonarDeleter;

            a.innerText = name;
            e.appendChild(a);
            b.innerText = amount;
            e.appendChild(b);
            c.innerText = date;
            e.appendChild(c);

            d.innerText="press to delete";
            e.appendChild(d);


            donartable.appendChild(e);
            DonarCount = 1;

        }
    }
    else if(DonarCount ===2 ){
        var k = keys[keys.length -1];
        var name = db[k].Name;
        var amount = db[k].Amount;
        var date = db[k].Date;

        const e = document.createElement("tr");
        const a = document.createElement("td");
        const b = document.createElement("td");
        const c = document.createElement("td");
        const d = document.createElement("td");

        DonarDeleteId++;

        DonarKeys.push(k);
        a.innerText = name;
        e.appendChild(a);
        b.innerText = amount;
        e.appendChild(b);
        c.innerText = date;
        e.appendChild(c);
        e.appendChild(d);

        donartable.appendChild(e);
        DonarCount =1;


    }
    else{
        console.log("This will never be called")
    }




}

function Donarerrdata(){
    console.log(data);

}
function Eventgotdata(data){

    if(EventCount ===0 ){
        const db = data.val();
        const keys = Object.keys(db);
        console.log("running");
        const donartable = document.getElementById("EventTable");

        const hd1 = document.createElement("tr");
        const hd2 = document.createElement("th");
        const hd3 = document.createElement("th");
        const hd4 = document.createElement("th");
        const hd5 = document.createElement("th");
        const hd6 = document.createElement("th");


        hd2.innerText = "EVENT NAME";
        hd1.appendChild(hd2);
        hd3.innerText = "EVENT DAY";
        hd1.appendChild(hd3);
        hd6.innerText = "EVENT TIME";
        hd1.appendChild(hd6);
        hd4.innerText = "EVENT DATE";
        hd1.appendChild(hd4);
        hd5.innerText="INSTRUCTION";
        hd1.appendChild(hd5);


        donartable.appendChild(hd1);

        for (let i=0; i< keys.length; i++) {
            var k = keys[i];
            var name = db[k].Name;
            var day = db[k].Day;
            var date = db[k].Date;
            var time = db[k].Time;


            EventKeys.push(k);
            Eventind.push(EventDeleteId);


            const e = document.createElement("tr");
            const a = document.createElement("td");
            const b = document.createElement("td");
            const c = document.createElement("td");
            const d = document.createElement("td");
            const f = document.createElement("td");

            e.id = EventDeleteId;
            EventDeleteId++;
            e.onclick = EventDeleter;



            a.innerText = name;
            e.appendChild(a);
            b.innerText = day;
            e.appendChild(b);
            f.innerText = time;
            e.appendChild(f);
            c.innerText = date;
            e.appendChild(c);

            d.innerText="press to delete";
            e.appendChild(d);

            donartable.appendChild(e);
            EventCount = 1;

        }



    }
    else if(EventCount===2){

        const db = data.val();
        const keys = Object.keys(db);
        console.log(keys);

        const Eventtable = document.getElementById("EventTable");

        var k = keys[keys.length -1];
        var name = db[k].Name;
        var day = db[k].Day;
        var date = db[k].Date;
        var time = db[k].Time;

        const e = document.createElement("tr");
        const a = document.createElement("td");
        const b = document.createElement("td");
        const c = document.createElement("td");
        const d = document.createElement("td");
        const f = document.createElement("td");


        EventKeys.push(k);

        EventDeleteId++;

        a.innerText = name;
        e.appendChild(a);
        b.innerText = day;
        e.appendChild(b);
        f.innerText = time;
        e.appendChild(f);
        c.innerText = date;
        e.appendChild(c);

        e.appendChild(d);

        Eventtable.appendChild(e);
        EventCount = 1;

    }
    else{
        console.log("this is the problem");
    }
}


function Eventerrdata(){
    console.log(data);

}

function change(){
    auth.signOut();
    sessionStorage.setItem("LogIn", null);
    location.href = "index.html";
}
