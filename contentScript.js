console.log('contentScript.js loaded');

const followingPath = "//div[@aria-label='Following']";
const topBarPath = followingPath + "/../../../..";
const reelsButtonPath = "//a[@href='/reels/']/../../..";
const exploreButtonPath = "//a[@href='/explore/']/../../..";

const getXPathElement = (path) => {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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
    console.log('removeStuff called, url: ' + url);
    
    if (url === 'https://www.instagram.com/') {
    window.location.href = 'https://www.instagram.com/?variant=following';
    }
    else if (url === 'https://www.instagram.com/?variant=following') {
        
        // const followingTab = locateElementByXPath(followingPath, 1000);
        // if (followingTab) {
        //     //followingTab.click();
        //     getTopBar().remove();
        // }
        // else {
        //     console.log('followingTab not found');
        // }

        locateWithXPath(topBarPath, 1000)
            .then((topBarPath) => {
                topBarPath.remove();
            })
            .catch((error) => {
                console.log('followingTab not found', error);
            });

        locateWithXPath(reelsButtonPath, 1000)
            .then((reelsButton) => {
                reelsButton.remove();
            })
            .catch((error) => {
                console.log('reelsButton not found', error);
            });

        locateWithXPath(exploreButtonPath, 1000)
            .then((exploreButton) => {
                exploreButton.remove();
            })
            .catch((error) => {
                console.log('exploreButton not found', error);
            });
    }
};


const locateWithXPath = (xpath, timeout) => {
    const endTime = Date.now() + timeout;
    const checkCondition = (resolve, reject) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            resolve(element);
        }
        else if (Date.now() < endTime) {
            setTimeout(checkCondition, 100, resolve, reject);
        }
        else {
            reject(new Error('Element not found with XPath: ' + xpath));
        }
    };
    return new Promise(checkCondition);
};    





removeStuff();
console.log('contentScript.js finished');