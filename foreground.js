console.log("Foreground.js is running");
chrome.storage.local.get('className', (data) => {
    let className = data.className;
    console.log(className, " is the className");
});



document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transitionDuration = '3.0s';
document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transform = 'rotate(1000deg)';