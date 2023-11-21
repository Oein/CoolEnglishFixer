(function () {
  function script() {
    // your main code here
    window.openFullsizeWindow = (uri, name) => {
      let x = document.createElement("a");
      x.target = "_blank";
      x.href = uri;
      x.innerText = ".";
      document.body.appendChild(x);
      x.click();
    };
  }

  function inject(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
  }

  inject(script);
})();
