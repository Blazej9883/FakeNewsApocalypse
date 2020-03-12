let page = document.getElementById('buttonDiv');

const kButtonsColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonsColors) {
    for(let item of kButtonsColors) {
        let button = document.createElement('button');
        button.style.backgroundColor = item;
        button.addEventListener('click', function () {
            chrome.storage.sync.set({color: item}, function () {
                console.log('color is ' + item);
            })
        });
        page.appendChild(button);
    }
}
constructOptions(kButtonsColors);