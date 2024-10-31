// ==UserScript==
// @name         Google Colab Redirect Bypass
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bypass redirect notice in Google Colab to access external links directly
// @author       kalin, ChatGPT
// @match        https://www.google.com/url?*
// @grant        none
// @license      MIT
// ==/UserScript==
 
// link: https://greasyfork.org/en/scripts/515055-google-colab-redirect-bypass
(function() {
    'use strict';
 
    // Check if the current page is the "Redirect Notice" page
    const isRedirectPage = () => {
        return document.title === 'Redirect Notice' && 
               document.body.innerHTML.includes('The previous page is sending you to');
    };
 
    // Jump to the target link automatically
    const redirectToTargetLink = () => {
        const linkElement = document.querySelector('a[href^="https://"]');
        if (linkElement) {
            window.location.href = linkElement.href; // 自动跳转
        }
    };
 
    // Detect the change of the page
    const observer = new MutationObserver(() => {
        if (isRedirectPage()) {
            redirectToTargetLink();
        }
    });
 
    // Initialize the observation
    window.addEventListener('load', () => {
        if (isRedirectPage()) {
            redirectToTargetLink();
        }
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();