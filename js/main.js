
var config = {
    authDomain: 'fake-news-apocalypse.firebaseapp.com',
    apiKey: 'AIzaSyC_H94FUWOgYvWaEiswq3yFik1nFb-dFVE',
    databaseURL: 'https://fake-news-apocalypse.firebaseio.com',
    storageBucket: 'fake-news-apocalypse.appspot.com'
};
firebase.initializeApp(config);


function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("main.js: onAuthStateChanged: User is signed in: " + user.displayName);
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';

        } else {
            console.log("main.js: onAuthStateChanged: User not signed in redirecting to credentials");
            window.location.href = "credentials.html";
            chrome.browserAction.setPopup({
                popup: "credentials.html"
            });
        }
    });
    //slider
    var elem = document.querySelector('input[type="range"]');

    var rangeValue = function(){
        var newValue = elem.value;
        var target = document.querySelector('.value');
        target.innerHTML = newValue;
    };

    elem.addEventListener("input", rangeValue);


    document.getElementById('logout').addEventListener('click', logout, false);
}

function logout() {
    if (firebase.auth().currentUser) {
        console.log(firebase.auth().currentUser);
        console.log("main.js: logout: logging out");
        firebase.auth().signOut();
    } else {
        console.log("main.js: logout: not logged out")
    }
}

window.onload = function() {
    initApp();
};