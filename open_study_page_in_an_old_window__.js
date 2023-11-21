var s = document.createElement("script");
s.src = chrome.runtime.getURL("open_study_page_in_an_old_window.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);
