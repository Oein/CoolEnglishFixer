var s = document.createElement("script");
s.src = chrome.runtime.getURL("multiple_windows.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);
