console.log('contentScript.js loaded');

const followingPath = "//div[@aria-label='Following']";
const topBarPath = followingPath + "/../../../..";
const reelsButtonPath = "//a[@href='/reels/']/../../..";
const exploreButtonPath = "//a[@href='/explore/']/../../..";

const getXPathElement = (path) => {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
};
    
const getFollowingTab = () => {
    return getXPathElement(followingPath);
};

const getTopBar = () => {
    return getXPathElement(topBarPath);
};

const getReelsButton = () => {
    return getXPathElement(reelsButtonPath);
};

const getExploreButton = () => {
    return getXPathElement(exploreButtonPath);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { type } = request;
    if (type === 'NEW') {
        //console.log('received message');
        removeStuff();
    }
});

const removeStuff = () => {
    const url = window.location.href;
    if (url === 'https://www.instagram.com/') {
    window.location.href = 'https://www.instagram.com/?variant=following';
    }

    // click on the following tab if it exists and remove the for you / following bar
    const followingTab = getFollowingTab();
    if (followingTab) {
        //followingTab.click();
        getTopBar().remove();
    }

    const reelsButton = getReelsButton();
    if (reelsButton) {
        reelsButton.remove();
    }

    const exploreButton = getExploreButton();
    if (exploreButton) {
        exploreButton.remove();
    }
};





removeStuff();
console.log('contentScript.js finished');