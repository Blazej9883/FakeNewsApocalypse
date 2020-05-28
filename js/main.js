
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
            console.log("main.js: onAuthStateChanged: User is signed in: " + user.displayName + " " + user.uid);
            uid = user.uid

            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            return uid;
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

    document.getElementById('reason').addEventListener('submit', submitForm, false);
    document.getElementById('logout').addEventListener('click', logout, false);
}

function checkCheckbox(id) {
    var state = document.getElementById(id);
    if(state.checked){
        //checked
        return true;
    }else{
        //not checked
        return false;
    }
}

function submitForm(e) {
    const database = firebase.database();
    console.log("submitForm: initilazing")
    e.preventDefault();
    var obvious = checkCheckbox('obvious_fake');
    console.log("submitForm:" + obvious)
    var probably = checkCheckbox('probably_fake');
    console.log("submitForm:" + probably)
    var sided = checkCheckbox('one_sided');
    console.log("submitForm:" + sided)
    var clickbait = checkCheckbox('clickbait');
    console.log("submitForm:" + clickbait)

    var reason = [obvious, probably, sided, clickbait];

    console.log("submitForm:" + reason)

    var rating = document.getElementById('rating').innerText;
    var username = "wpm"
    var email = "sasa"

    console.log("submitForm:" + rating )
    var url = "jebac kenie"




    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        console.log("submitForm:chrome tabs")
        var url = tabs[0].url;
        console.log("submitForm:" + url)

        alert(url);

        submitReview(url,uid, reason, rating);

        // use `url` here inside the callback because it's asynchronous!
    });







}

function submitReview(url_site, uid, reason, score){


    var url = url_site.toString().replace("https://", "");
    var url = url.toString().split("/", 1);
    var url = url.toString().replace("www.","")
    var url = url.toString().split(".",1)


    alert(url);
    firebase.database().ref('user_reviews/' + uid).push({
        news: url_site,
        reason: reason,
        score: score
    }, function (error) {
        if(error) {
            alert('error')
        }else{
            alert('data saved succesfully')

        }
    });

    firebase.database().ref('reviews/' +  url).push({
        news: url_site,
        rating_count: 1,
        reason: reason,
        score: score
    }, function (error) {
        if(error) {
            alert('error')
        }else{
            alert('data saved succesfully')
        }
    });






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