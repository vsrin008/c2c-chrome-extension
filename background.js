console.log('background.js is running');
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        className: "dgc"
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { //Injects Foreground script when new tab is opened
    if (changeInfo.status === 'complete') {
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./foreground_styles.css"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND STYLES.");

                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./foreground.js"]
                })
                    .then(() => {
                        console.log("INJECTED THE FOREGROUND SCRIPT.");
                    });
            })
            .catch(err => console.log(err));
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { // Listens for a get_name or change_name request and responds appropriately
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
    } else if (request.message === 'change_className') {
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
});