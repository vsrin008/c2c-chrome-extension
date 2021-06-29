function save_options() {
  var className = document.querySelector("#className").value;
  var iconSize = document.querySelector('#iconSize').value;
  chrome.storage.local.set({
    className: className,
    iconSize: iconSize
  }, function() {
    // Update status to let user know options were saved.
    var status = document.querySelector('#status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value prefClassName = 'dgc' and prefIconSize = 'small'.
  chrome.storage.local.get({
    className: 'dgc',
    iconSize: 'small'
  }, function(items) {
    document.querySelector('#className').value = items.className;
    document.querySelector('#iconSize').value = items.iconSize;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.querySelector('#save').addEventListener('click', () => {
    save_options();
    chrome.runtime.sendMessage({
      message: "render_c2c_page"
    
    });
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


    
  