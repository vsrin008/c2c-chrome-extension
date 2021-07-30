chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        'className': ".dgc",
        'iconSize' : "small"
    });
});

chrome.runtime.onStartup.addListener(() => {
    console.log("Test alert");
    fetch('http://zipline.dgc.com/perl/ext_startup.pl')
    .then(response => response.json())
    .then(data => console.log(data));
    
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { //Injects Foreground script when new tab is opened
    // var opt = {
    //     iconUrl: "icon.png",
    //     type: 'basic',
    //     title: 'Primary Title',
    //     message: 'Primary message to display',
    //     priority: 1
    //   };
    //   chrome.notifications.create('notify1', opt, function() { console.log('created!'); });
    if (changeInfo.status === 'complete') {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./foreground.js"]
         })
            .then(() => {
                console.log("INJECTED THE FOREGROUND SCRIPT.");
            })
            .catch(err => console.log(err));
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'render_c2c_page') {
        chrome.tabs.reload()

    }``

    if (request.message === 'get_className') {
        chrome.storage.local.get('className', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });

                return;
            }

            sendResponse({
                message: 'success',
                payload: data.className
            });
        });

        return true;
    }

    if (request.message === 'get_iconSize') {
        chrome.storage.local.get('iconSize', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });

                return;
            }

            sendResponse({
                message: 'success',
                payload: data.iconSize
            });
        });

        return true;
    }

    else if (request.message === 'change_className') {
        chrome.storage.local.set({
            className: request.payload
        }, () => {
            if (chrome.runtime.lastError) {
                sendResponse({ message: 'fail' });
                return;
            }

            sendResponse({ message: 'success' });
        })

        return true;
    }

    else if (request.message === 'change_iconSize') {
        chrome.storage.local.set({
            iconSize: request.payload
        }, () => {
            if (chrome.runtime.lastError) {
                sendResponse({ message: 'fail' });
                return;
            }

            sendResponse({ message: 'success' });
        })

        return true;
    }


});