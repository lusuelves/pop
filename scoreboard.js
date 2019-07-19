const ScoreBoard = {
    ctx: undefined,
    init: function (ctx) {
      this.ctx = ctx
      this.ctx.font = "30px Titillium Web"
    },
    
    update: function (score) {
      this.ctx.fillStyle = "green";
      this.ctx.fillText(Math.floor(score) + "PTS", 50, 50);
    }
  }