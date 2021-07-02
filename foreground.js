
function getEffectiveNumber(node) {
    return node.innerHTML;

}
function validate(phone) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    console.log(regex.test(phone))
  }
  

chrome.storage.local.get(['className', 'iconSize'], (data) => {
    let className = data.className;
    let iconSize = data.iconSize;
    console.log("className = %s, iconSize = %s", className, iconSize);
    
    // renderClickElements(classname, iconsize);

    var numbers = document.querySelectorAll(className); // creates an array of all elements with desired className
    var count = numbers.length; 
    console.log("The count is: " + count);

    
    for (var i=0; i <count; ++i) {
        let numberToAlert = numbers[i].innerHTML;

        // make sure numberToAlert contains a valid phone number here
        let effectiveNumber = getEffectiveNumber(numbers[i]);
        console.log("effectiveNUmber = %o", effectiveNumber);


        if (! effectiveNumber) {
            // unable to get a valid number from teh element, do nothing
            continue;
        }

        let iconWidth = "20";
        if (iconSize === 'medium') {
            iconWidth = "40";
        } else if (iconSize === 'large') {
            iconWidth = "60";
        }
        
        if (validate(numbers[i]) === "true") {
            console.log("Number is valid");
            numbers[i].innerHTML += `<img src="https://louisville.edu/enrollmentmanagement/images/phone-icon/image" width="${iconWidth}" id="c2cicon" onclick='alert("${effectiveNumber}");' >`;
        }
        else {
            console.log("Not a valid number");
        }
    }
}
);
