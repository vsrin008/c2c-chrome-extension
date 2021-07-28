document.head.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">'


function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
  }
  
  addStyle(`
  .material-icons.md-18 { font-size: 18px; }
  .material-icons.md-24 { font-size: 24px; }
  .material-icons.md-36 { font-size: 36px; }
  .material-icons.md-48 { font-size: 48px; }
  
  `);
  
  


function getEffectiveNumber(node) {
    let nodeHTML = node.innerHTML;
    nodeHTML = nodeHTML.replace(/^\s*/,"").replace(/\s*$/,"");
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]+[0-9]{4,6}$/im;
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
    console.log("document = %o", document); 
    console.log("The count is: " + count + " Query string is: " + className);

    
    for (var i=0; i <count; ++i) {
        let numberToAlert = numbers[i].innerHTML;

        // make sure numberToAlert contains a valid phone number here
        let effectiveNumber = getEffectiveNumber(numbers[i]);
        console.log("effectiveNUmber = %o", effectiveNumber);


        if (! effectiveNumber) {
            // unable to get a valid number from teh element, do nothing
            continue;
        }

        let iconWidth = "18";
        if (iconSize === 'medium') {
            iconWidth = "24";
        } else if (iconSize === 'large') {
            iconWidth = "48";
        }
        

        numbers[i].innerHTML += `<a href="callto://${effectiveNumber}"><span class="material-icons md-${iconWidth}" id="c2cicon" onclick='alert("${effectiveNumber}");' >call</a>`;
    }
}
);
