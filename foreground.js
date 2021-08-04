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
  

chrome.storage.local.get(['querySelArr', 'querySelServerArr','iconSize'], (data) => {
    let querySelArr = data.querySelArr;
    let querySelServerArr = data.querySelServerArr;
    let iconSize = data.iconSize;
    console.log("querySelArr = %o, querySelServerArr = %o, iconSize = %s", querySelArr, querySelServerArr, iconSize);
    querySelArr = querySelArr.concat(querySelServerArr);

    for (let i = 0; typeof querySelArr != "undefined" && i < querySelArr.length; i++) {
        var querySel = querySelArr[i];

        console.log("i = %d, querySel = %s", i, querySel);

        if (!querySel || querySel === "") {
            // if queryselector is empty, do nothing
            continue;
        }

        var elems = document.querySelectorAll(querySel);

        var count = elems.length;
        console.log("The count for elements matching query %s is %d ", querySel, count);
        
        for (var j=0; j <count; ++j) {
            // make sure numberToAlert contains a valid phone number here
            let effectiveNumber = getEffectiveNumber(elems[j]);
            console.log("effectiveNUmber for elem# %d = %s", j, effectiveNumber);

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
            

            elems[j].innerHTML += `<a href="callto://${effectiveNumber}"><span class="material-icons md-${iconWidth}" id="c2cicon" onclick='alert("${effectiveNumber}");' >call</a>`;
        }
    }
});
