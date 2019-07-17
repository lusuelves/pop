window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementsByClassName("cover")[0].setAttribute("class", "hidden")
    Game.init("canvas")
      if (Game.lives != 0)
        Game.start()
      else {
        console.log("game over")
      };
    };
    document.getElementById("players").onclick = function () {
      Game.numPlayers = 2
    }
  };