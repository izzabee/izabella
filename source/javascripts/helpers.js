// Consolidates looping over set of element to add or remove and event listener
const addRemoveEvent = function(action, els, eventName, callback, options) {
  for (let i = els.length - 1; i >= 0; i--) {
    els[i][action](eventName, callback, options);
  }
  return els;
}

const addEvent = (els, eventName, callback, options = {}) => {
  return addRemoveEvent('addEventListener', els, eventName, callback, options);
}

const addListener = function(e, str, func) {
  if (e.addEventListener) {
    e.addEventListener(str, func, false);
  } else if (e.attachEvent) {
    e.attachEvent('on' + str, func);
  }
};

const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

const toggleBrowserClass = () => {
  if (isSafari) document.body.classList.add('is-safari')
}

document.addEventListener('DOMContentLoaded', toggleBrowserClass)
