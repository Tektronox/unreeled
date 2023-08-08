# unreeled
Instagram unreeled


//a[@href="/reels/"]
"//a[@href='/reels/']/../../.."

//a[@href="/explore/"]

document.evaluate("//a[@href='/reels/']/../../..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.hidden = true