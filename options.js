function save_options() { //saves an array with the user-inputted querySelectors
    var querySelArr = [];
    var elemArr = document.querySelectorAll(".querySelClass.userSelClass").forEach(element => {
    querySelArr.push(element.value);
});;

  console.log("querySelArr %o", querySelArr);
  var iconSize = document.querySelector('#iconSize').value;
  chrome.storage.local.set({
    querySelArr: querySelArr,
    iconSize: iconSize
  }, function () {
    // Update status to let user know options were saved.
    var status = document.querySelector('#status');
    status.style.color = 'white';
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.local.get({
        querySelArr: [],
        querySelServerArr: [],
        iconSize: 'small'
    }, function(items) {
        var querySelArr = items.querySelArr;
        for (let i = 0; i < querySelArr.length; i++) {
            var querySel = querySelArr[i];
            if (querySel) {
                let elementID = "querySelector"+(i+1);
                document.getElementById(elementID).value = querySel;
            }
        }
        var querySelServerArr = items.querySelServerArr;
        for (let i = 0; i < querySelServerArr.length; i++) {
            var querySelServer = querySelServerArr[i];
            if (querySelServer) {
                let elementID = "querySelector"+(i+6);
                document.getElementById(elementID).value = querySelServer;
            }
        }
        document.getElementById('iconSize').value = items.iconSize;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.querySelector('#save').addEventListener('click', () => { //calls function to save options when save button is clicked
    save_options();
});




    
  