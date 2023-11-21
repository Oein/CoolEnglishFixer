(function () {
  function script() {
    const pad2 = (n) => (n < 10 ? "0" + n : n);

    const dateStr = () => {
      const d = new Date();
      return `[${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(
        d.getSeconds()
      )}]`;
    };

    const log = (...str) => {
      let id = Math.random().toString(36).substr(2, 9);
      const dv = document.createElement("div");
      dv.innerText = dateStr() + " " + str.join(" ");
      dv.setAttribute(
        "style",
        "opacity: 0;transition:.2s ease all;background-color:rgba(0,0,0,.3);border-radius:4px;padding:4px;color:#fff"
      );

      document.getElementById("lgx").appendChild(dv);
      dv.setAttribute("id", id);

      setTimeout(() => {
        let ht = document.getElementById(id).getBoundingClientRect().height;
        dv.style.maxHeight = "0px";
        setTimeout(() => {
          dv.style.maxHeight = ht + "px";
          dv.style.opacity = "1";

          setTimeout(() => {
            document.getElementById(id).scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }, 100);
        }, 10);
      }, 10);
    };

    /**
     *
     * @param {string} cmd
     */
    const handleCommand = (cmd) => {
      cmd = cmd.trim();
      const cmdl = cmd.toLowerCase();
      if (cmdl.startsWith("speed")) {
        if (!cmdl.startsWith("speed "))
          return log("Usage : speed [speed 0.1 ~ 10]");
        const spd = parseFloat(cmd.replace("speed ", ""));
        if (isNaN(spd)) return log("Invalid speed");
        if (spd < 0) return log("Speed must be positive");
        if (spd > 10) return log("Speed must be less than 10");
        log(`Setting speed to ${spd}`);
        audioElementlc.playbackRate = spd;
        speedvalue = spd;
      }
      if (cmdl.startsWith("vol")) {
        if (!cmdl.startsWith("vol ")) return log("Usage : vol [vol 0 ~ 100]");
        const vol = parseInt(cmd.replace("vol ", ""));
        if (isNaN(vol)) return log("Invalid volume");
        if (vol < 0) return log("Volume must be positive");
        if (vol > 100) return log("Volume must be less than 100");
        vol = vol / 100;
        log(`Setting volume to ${vol * 100}`);
        audioElementlc.volume = vol;
      }
    };

    const addLogger = () => {
      let lg = document.createElement("div");
      lg.setAttribute("id", "log");
      lg.setAttribute(
        "style",
        `z-index:100;position:fixed;left:5px;bottom:5px;width:min(400px,80vw);padding:5px;border-radius:8px;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);display:flex;flex-direction:column;row-gap:4px`
      );
      lg.innerHTML += `<div style=color:#fff;display:flex;flex-direction:row;justify-content:space-between>Logs <span id="shd" style=cursor:pointer>Show Detail</span></div>
      <div style="display:flex;flex-direction:column;gap:2px;background-color:rgba(0,0,0,.3);padding:4px;border-radius:8px;transition:all .2s ease;overflow-y:auto;overflow-x:hidden;box-sizing:border-box;height:fit-content;max-height:200px;margin-bottom:0"id=lgx></div>
      <input id=cmd placeholder="Type any command to run"style="background-color:rgba(0,0,0,.3);outline:0;border:none;color:#fff;padding:4px;border-radius:4px;transition:all .2s ease;overflow:hidden"/>`;
      document.body.appendChild(lg);
      let op = true;
      const hide = () => {
        document.getElementById("lgx").style.maxHeight = "0px";
        document.getElementById("lgx").style.opacity = "0";
        document.getElementById("lgx").style.marginBottom = "-.9rem";
      };
      const show = () => {
        document.getElementById("lgx").style.maxHeight = "200px";
        document.getElementById("lgx").style.opacity = "1";
        document.getElementById("lgx").style.marginBottom = "0px";
      };
      const toggle = () => {
        if (op) hide();
        else show();
        op = !op;
        document.getElementById("shd").innerText = op
          ? "Hide Detail"
          : "Show Detail";
      };
      document.getElementById("shd").addEventListener("click", toggle);
      toggle();
      document.getElementById("cmd").addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          handleCommand(document.getElementById("cmd").value);
          document.getElementById("cmd").value = "";
        }
      });
    };

    const fixSavingBug = () => {
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
          let nurl = new URLSearchParams(location.search);
          log(`Start to save ${current_index_count} / ${total_word_count}`);
          fetch(
            `https://coolenglish.co.kr/word/save.php?${new URLSearchParams({
              study_setting_uid: nurl.get("study_setting_uid"),
              m_id: nurl.get("m_id"),
              step: "LC",
              current_index_count: current_index_count,
              total_word_count: total_word_count,
              correct: true,
              studytime: 2,
              _: Date.now(),
            }).toString()}`
          )
            .then((v) => v.text())
            .then((v) => {
              log("Saved", v);
            })
            .catch((e) => {
              log("Error while saving:", e);
            });
        }
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
    toastr.success("CoolEnglish Fixer Injected!");

    const main = () => {
      addLogger();
      fixSavingBug();
    };

    document.getElementById("startbtn").addEventListener("click", () => {
      setTimeout(() => {
        main();
      }, 100);
    });
  }

  function inject(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
  }

  const injectToastr = () => {
    let c = document.createElement("link");
    c.rel = "stylesheet";
    c.href =
      "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css";
    document.head.appendChild(c);

    c.onload = () => {
      script();
    };
  };
  injectToastr();
})();
