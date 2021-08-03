function save_options() {
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
                let elementID = "className"+(i+1);
                document.getElementById(elementID).value = querySel;
            }
        }
        var querySelServerArr = items.querySelServerArr;
        for (let i = 0; i < querySelServerArr.length; i++) {
            var querySelServer = querySelServerArr[i];
            if (querySelServer) {
                let elementID = "className"+(i+6);
                document.getElementById(elementID).value = querySelServer;
            }
        }
        document.getElementById('iconSize').value = items.iconSize;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.querySelector('#save').addEventListener('click', () => {
    save_options();
    // chrome.runtime.sendMessage({
    //   message: "render_c2c_page"
    
    // });
  //   chrome.runtime.sendMessage({ 
  //       message: "change_className",
  //       payload: document.getElementById('className').value
  //   }, response => {
  //       if (response.message === 'success') {
  //           console.log('Updated className');
  //       }
  //   });
  //   chrome.runtime.sendMessage({ 
  //     message: "change_iconSize",
  //     payload: document.getElementById('iconSize').value
  // }, response => {
  //     if (response.message === 'success') {
  //         console.log('Updated iconSize');
  //     }
  // });
});




    
  