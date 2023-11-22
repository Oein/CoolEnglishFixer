(() => {
  var s = document.createElement("script");
  s.src = chrome.runtime.getURL("libs/toastr.min.js");
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
})();
(() => {
  var s = document.createElement("script");
  s.src = chrome.runtime.getURL("fixer/index.js");
  s.type = "module";
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
})();
