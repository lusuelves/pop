window.onload = function() {
    Game.init("canvas")
    document.getElementById("start-button").onclick = function() {
      if (Game.lives != 0)
        Game.start()
      else {
        console.log("game over")
      };
    };
  };