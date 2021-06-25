console.log("Foreground.js is running");


chrome.storage.local.get(['className', 'iconSize'], (data) => {
    let className = data.className;
    let iconSize = data.iconSize;
    console.log(className, " is the className");
    console.log(iconSize, " is the iconSize");
    
    var numbers = document.getElementsByClassName(className); // creates an array of all elements with onsip-click-to-call class
    var count = document.getElementsByClassName(className).length; // gets length of array

    for (var i=0; i <=count; ++i) {
        if (iconSize === 'small') {
            numbers[i].innerHTML += '<img src="https://louisville.edu/enrollmentmanagement/images/phone-icon/image" width=20>';
        }
        else if (iconSize === 'medium') {
            numbers[i].innerHTML += '<img src="https://louisville.edu/enrollmentmanagement/images/phone-icon/image" width=40>';
        }
        else if (iconSize === 'large') {
            numbers[i].innerHTML += '<img src="https://louisville.edu/enrollmentmanagement/images/phone-icon/image" width=80>';
        }
    }
});




// document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transitionDuration = '3.0s';
// document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transform = 'rotate(1000deg)';