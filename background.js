chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("https://www.instagram.com") &&
        tab.url != "https://www.instagram.com/?variant=following") {

        console.log('sending message');
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
        });
    }
});