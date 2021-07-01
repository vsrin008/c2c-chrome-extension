
chrome.storage.local.get(['className', 'iconSize'], (data) => {
    let className = data.className;
    let iconSize = data.iconSize;
    console.log(className, " is the className");
    console.log(iconSize, " is the iconSize");
    
    var numbers = document.querySelectorAll(className); // creates an array of all elements with desired className
    var count = numbers.length; // gets length of array
    console.log("The count is: " + count);

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

