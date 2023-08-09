chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("https://www.instagram.com")) {

        console.log('sending message to tab, url: ' + tab.url);
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
        });
    }
});