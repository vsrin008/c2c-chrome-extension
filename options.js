function save_options() {
  var className = document.getElementById('className').value;
  var iconSize = document.getElementById('iconSize').value;
  chrome.storage.local.set({
    prefClassName: className,
    prefIconSize: iconSize
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
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
    prefClassName: 'dgc',
    prefIconSize: 'small'
  }, function(items) {
    document.getElementById('className').value = items.prefClassName;
    document.getElementById('iconSize').value = items.prefIconSize;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', () => {
    save_options();
    chrome.runtime.sendMessage({ 
        message: "change_className",
        payload: document.getElementById('className').value
    }, response => {
        if (response.message === 'success') {
            console.log('Updated className');
        }
    });
    chrome.runtime.sendMessage({ 
      message: "change_iconSize",
      payload: document.getElementById('iconSize').value
  }, response => {
      if (response.message === 'success') {
          console.log('Updated iconSize');
      }
  });
});


    
  