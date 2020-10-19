
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







