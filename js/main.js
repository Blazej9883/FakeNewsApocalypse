
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
            console.log("chuj");
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';

        } else {
            console.log("pizda");
            window.location.href = "credentials.html";
        }
    });
}

window.onload = function() {
    initApp();
};