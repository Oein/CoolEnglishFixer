(() => {
  var s = document.createElement("script");
  s.src = chrome.runtime.getURL("toastr.min.js");
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
})();
(() => {
  var s = document.createElement("script");
  s.src = chrome.runtime.getURL("fixer.js");
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
})();
