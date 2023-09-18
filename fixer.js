(function () {
  const fixBGBUG = () => {
    if (window.bgBugFixed === true) return;
    window.bgBugFixed = true;

    const bgLinks = "347695".split("").map((j) => "/word/img/bg0" + j + ".jpg");

    document
      .querySelectorAll('.fadeShow > img:not([alt=""])')
      .forEach((x) => x.remove());

    const changeBG = () => {
      document.body.style.background = `url(${
        bgLinks[Math.floor(Math.random() * bgLinks.length)]
      })`;
    };

    setInterval(changeBG, 1000 * 60 * 5);
    changeBG();
  };

  function script() {
    const fixSAVEPHPBUG = () => {
      let fetching = false;
      const eventHandler = function () {
        if (current_step_type == "SP") return;

        if (
          current_step_type == "SA" ||
          current_step_type == "SB" ||
          current_step_type == "SC" ||
          current_step_type == "SD" ||
          current_step_type == "RR" ||
          current_step_type == "LR"
        ) {
        } else {
          if (fetching) return;
          fetching = true;
          $.ajax({
            type: "GET",
            url: "https://coolenglish.co.kr/word/save.php",
            data:
              "study_setting_uid=" +
              "2610382" +
              "&m_id=" +
              "100408" +
              "&step=LC" +
              "&current_index_count=" +
              current_index_count +
              "&total_word_count=" +
              total_word_count +
              "&correct=true" +
              "&studytime=2", //+study_time,
            error: function () {},
            async: false,
            cache: false,
            complate: function (response) {},
            success: function (data) {
              fetching = false;

              if (
                current_step_type == "SA" ||
                current_step_type == "SB" ||
                current_step_type == "SC" ||
                current_step_type == "SD" ||
                current_step_type == "RR" ||
                current_step_type == "LR"
              ) {
              } else {
                if (current_index_count + 1 == total_word_count) {
                  $("#nextclick").show();
                }
              }

              if (player_state == 1) {
                player_state = 0;
                return true;
              }

              if (playtimer) clearTimeout(playtimer);
              playtimer = setTimeout(timeplay, 10);
            },
          });
        }

        return true;
      };

      window.speech2 = (idx) => {
        window.select_position_mark(current_index_count);
        window
          .$("#pageindex")
          .html(
            parseInt(current_index_count) + parseInt(1) + "/" + total_word_count
          );

        audioElementlc.addEventListener("ended", eventHandler);
      };
    };

    document.getElementById("startbtn").style.display = "inline-block";
    toastr.success("CoolEnglish Fixer Started!");

    const main = () => {
      fixSAVEPHPBUG();
      document.getElementById("singo").remove();
    };

    document.getElementById("startbtn").addEventListener("click", main);
  }

  function inject(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
  }

  const injectToastr = () => {
    let s = document.createElement("script");
    s.src =
      "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js";
    document.head.appendChild(s);

    let c = document.createElement("link");
    c.rel = "stylesheet";
    c.href =
      "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css";
    document.head.appendChild(c);

    s.onload = () => {
      inject(script);
    };
  };

  document.getElementById("startbtn").style.display = "none";
  injectToastr();
  inject(fixBGBUG);
})();
