//console.log('contentScript.js loaded');

const followingPath = "//div[@aria-label='Following']";
const topBarPath = followingPath + "/../../../..";
const reelsButtonPath = "//a[@href='/reels/']/../../..";
const exploreButtonPath = "//a[@href='/explore/']/../../..";

const elementSearchTimeout = 2500;
const searchInterval = 250;

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
    //console.log('removeStuff called, url: ' + url);
    
        
    locateWithXPath(reelsButtonPath, elementSearchTimeout)
        .then((reelsButton) => {
            reelsButton.remove();
        })
        .catch((error) => {
            //console.log('reelsButton not found', error);
        });

    locateWithXPath(exploreButtonPath, elementSearchTimeout)
        .then((exploreButton) => {
            exploreButton.remove();
        })
        .catch((error) => {
            //console.log('exploreButton not found', error);
        });

    locateWithXPath(topBarPath, elementSearchTimeout)
        .then((topBarPath) => {
            topBarPath.remove();
        })
        .catch((error) => {
            //console.log('followingTab not found', error);
        });


    // check if we are on a forbidden url
    if (url == 'https://www.instagram.com/' ||
        url.includes('https://www.instagram.com/reels/') ||
        url.includes('https://www.instagram.com/explore')) {
            window.location.href = 'https://www.instagram.com/?variant=following';
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
            setTimeout(checkCondition, searchInterval, resolve, reject);
        }
        else {
            reject(new Error('Element not found with XPath: ' + xpath));
        }
    };
    return new Promise(checkCondition);
};    

removeStuff();
//console.log('contentScript.js finished');