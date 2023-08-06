console.log('contentScript.js loaded');

// read the url and redirect to following page if on the home page
const url = window.location.href;
if (url === 'https://www.instagram.com/') {
    window.location.href = 'https://www.instagram.com/?variant=following';
}

// remove for your / following  top bar
const topBarClasses = "xvbhtw8 xixxii4 x13vifvy xk3oba8 xh8yej3 x1mcj5oc";
const topBar = document.getElementsByClassName(topBarClasses)[0];
topBar.parentElement.hidden = true;

// remove insta logo link
const linkClasses = "x2lah0s x1to3lk4 x1n2onr6 xh8yej3"
const link = document.getElementsByClassName(linkClasses)[0];
link.hidden = true;

// remove unwanted sidebar elements
const elementsWithHref = document.querySelectorAll('[href]');
const linksToRemove = ["/explore/", "/reels/"]
let targetElements = [];
for (const element of elementsWithHref) {
    if (linksToRemove.includes(element.getAttribute('href'))) {
        element.parentElement.parentElement.parentElement.hidden = true;
        console.log('removed element: ', element);
    }
}




console.log('contentScript.js finished');