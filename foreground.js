
function getEffectiveNumber(node) {
    let nodeHTML = node.innerHTML;
    nodeHTML = nodeHTML.replace(/^\s*/,"").replace(/\s*$/,"");
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!regex.test(nodeHTML)) {
        return;
    }
    let effNum =  nodeHTML.replace(/\D/g,"");

    if (effNum.length == 10) {
        effNum = '91' + effNum;
    } 
    else if (effNum.length != 4) {
        effNum = '9' + effNum;
    }

    return effNum;
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
        

        numbers[i].innerHTML += `<a href="callto://${effectiveNumber}"><img src="https://louisville.edu/enrollmentmanagement/images/phone-icon/image" width="${iconWidth}" id="c2cicon" onclick='alert("${effectiveNumber}");' ></a>`;
    }
}
);
