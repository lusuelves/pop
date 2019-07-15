const Game = {
    canvas: undefined,
    ctx: undefined,
    winW: undefined,
    winH: undefined,
    fps: 60,
    keys: {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32,
        b: 66
    },
    init: function () {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.winW = window.innerWidth
        this.winH = window.innerHeight
        this.canvas.width = this.winW
        this.canvas.height = this.winH
        this.components()
    },
    start: function () {
        this.interval = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.moveAll()
            this.newBubble()
            this.gameOver()
        },1000/this.fps)
    },

    components: function () {
        this.background = new Background(this.ctx, "fondoPlanets.png")
        this.player = new Player(this.ctx, "lu.png", this.keys)
        this.bubble = new Bubble(this.ctx, "bubble.png", 70, 0,0)
    },

    drawAll: function () {
        this.background.draw()
        this.player.draw()
        this.bubble.draw()
    },

    moveAll () {
        this.bubble.move(5)
        if (this.player._bullets[0] != undefined) {this.player._bullets[0].move()}
    },

    isCollision() {
        if (this.bubble._posX + this.bubble._width > this.player._posX &&
            this.bubble._posY + this.bubble._height > this.player._posY + 80 &&
            this.bubble._posX < this.player._posX + this.player._width)
            return true
        },
    newBubble () {
        if(this.player._bullets[0] != undefined && this.bubble._height > 50 &&
            this.bubble._posX + this.bubble._width >= this.player._bullets[0]._posX
                &&
                this.bubble._posX <= this.player._bullets[0]._posX + this.player._bullets[0]._width)
            {
            this.a = this.bubble._posY - this.bubble._height
            this.bubble = new Bubble(this.ctx, "bubble.png", 40, this.player._bullets[0]._posX, this.a)
            this.bubble._velY = -5
            this.player._bullets.splice(0,1)
        }
        if(this.player._bullets[0] != undefined && this.bubble._height < 50 &&
            this.bubble._posX + this.bubble._width >= this.player._bullets[0]._posX
                &&
                this.bubble._posX <= this.player._bullets[0]._posX + this.player._bullets[0]._width)
            {
            clearInterval(this.interval)
        }
    },
    clearAll: function(){
        this.ctx.clearRect(0, 0, this.winW, this.winH);
    },
    gameOver() {
        if (this.isCollision()) {
            clearInterval(this.interval)
        }
    }
    

}