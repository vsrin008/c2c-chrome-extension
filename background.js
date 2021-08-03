function fetchFromServer() { //gets querySelectors from server and sets them in local storage
    fetch('http://zipline.dgc.com/perl/ext_startup.pl')
        .then(response => response.json())
        .then(function (data) { 
            console.log(data); 
            let ver = data.version;
            let respQueryList = data.queryList;
            console.log("chrome.storage.local.set querySelServerArr = %o", respQueryList )
            chrome.storage.local.set({
                'querySelServerArr' : respQueryList,
                'serverVer' : ver
            })
        });
}

chrome.runtime.onInstalled.addListener(() => {
    fetchFromServer();
});


chrome.runtime.onStartup.addListener(() => {
    fetchFromServer();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { //Injects Foreground script when new tab is opened
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
