const Game = {
    canvas: undefined,
    ctx: undefined,
    winW: undefined,
    winH: undefined,
    fps: 60,
    bubbles: [],
    keys: {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32,
        b: 66
    },
    framesCounter: 0,
    level: 1,
    score: 1000,
    lives: undefined,
    bonus: undefined,
    init: function () {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.winW = window.innerWidth
        this.winH = window.innerHeight
        this.canvas.width = this.winW
        this.canvas.height = this.winH
    },
    start: function () {
        this.bubbles = []
        this.components()
        this.scoreboard = ScoreBoard
        this.scoreboard.init(this.ctx)
        this.interval = setInterval(() => {
            this.framesCounter++
            if(this.framesCounter%100==0) this.score--
            this.clearAll()
            this.drawAll()
            this.moveAll()
            this.newBubble()
            this.newBonus()
            this.getBonus()
            console.log(this.player._lives)
            this.clearBullet()
            this.gameOver()
            this.win()
        },1000/this.fps)
    },

    components: function () {
        if(this.level == 1){
        this.background = new Background(this.ctx, "fondoPlanets.png")
        this.player = new Player(this.ctx, "louAttacks2.png", this.keys)
        this.bubble = new Bubble(this.ctx, "bubble.png", 70, 0,0)
        this.bubbles.push(this.bubble)
        }
        if(this.level == 2){
            this.background = new Background(this.ctx, "fondoAzul.jpeg")
            this.player = new Player(this.ctx, "louAttacks2.png", this.keys)
            this.bubble = new Bubble(this.ctx, "florMorada.png", 120, 0,0)
            this.bubbles.push(this.bubble)
            }
    },

    drawAll: function () {
        this.background.draw()
        this.player.draw(this.framesCounter)
        if(this.bonus != undefined) this.bonus.draw()
        this.bubbles.forEach(elm => elm.draw())
        this.drawScore()
    },

    moveAll () {
        if(this.bonus != undefined)this.bonus.move()
        this.bubbles.forEach(elm => elm.move())
        if (this.player._bullets[0] != undefined) {this.player._bullets[0].move()}
    },

    isCollision() {
        return this.bubbles.some(elm => {
        return elm._posX + elm._width > this.player._posX &&
            elm._posY + elm._height > this.player._posY + 80 &&
            elm._posX < this.player._posX + this.player._width
        })},
    newBubble () {
        return this.bubbles.some((elm,idx) =>{
        if (this.player._bullets[0] != undefined && elm._height > 100 &&
            elm._posX + elm._width >= this.player._bullets[0]._posX
                &&
                elm._posX <= this.player._bullets[0]._posX + this.player._bullets[0]._width
                &&
                elm._posY + elm._height >= this.player._bullets[0]._posY
        )
            {
            this.score += 200
            this.a = this.bubbles[idx]._posY - this.bubbles[idx]._height
            this.bubbles.splice(idx,1)
            this.bubble = new Bubble(this.ctx, "florAzul.png", 70, this.player._bullets[0]._posX, this.a)
            this.bubble._velY = -1
            this.bubbles.push(this.bubble)
            this.bubble = new Bubble(this.ctx, "florRoja.png", 70, this.player._bullets[0]._posX, this.a)
            this.bubble._velY = -1
            this.bubble._velX = -5
            this.bubbles.push(this.bubble)
            this.player._bullets.splice(0,1)
        }
        if (this.player._bullets[0] != undefined && elm._height > 50 &&
            elm._posX + elm._width >= this.player._bullets[0]._posX
                &&
                elm._posX <= this.player._bullets[0]._posX + this.player._bullets[0]._width
                &&
                elm._posY + elm._height >= this.player._bullets[0]._posY
        )
            {
            if(this.level == 2){
                this.url1 = "florAmarilla.png"
                this.url2 = "florNegra"
            }
            else{
                this.url = "bubble.png"
                this.url1 = this.url
            }
            this.score += 100
            this.a = this.bubbles[idx]._posY - this.bubbles[idx]._height
            this.bubbles.splice(idx,1)
            this.bubble = new Bubble(this.ctx, this.url1, 40, this.player._bullets[0]._posX, this.a)
            this.bubble._velY = -1
            this.bubbles.push(this.bubble)
            this.bubble = new Bubble(this.ctx, this.url, 40, this.player._bullets[0]._posX, this.a)
            this.bubble._velY = -1
            this.bubble._velX = -5
            this.bubbles.push(this.bubble)
            this.player._bullets.splice(0,1)
        }
        if(this.player._bullets[0] != undefined && elm._height < 50 &&
            elm._posX + elm._width >= this.player._bullets[0]._posX
            &&
            elm._posX <= this.player._bullets[0]._posX + this.player._bullets[0]._width
            &&
            elm._posY + elm._height >= this.player._bullets[0]._posY)
            {
                this.score += 50
                this.bubbles.splice(idx,1)
                this.player._bullets.splice(0,1)
            }
        })
    },
    clearBullet: function() {
        if(this.player._bullets[0] != undefined){
            if(this.player._bullets[0]._posY <= 0){
                this.player._bullets.splice(0,1)
            }
        }
    },
    clearAll: function(){
        this.ctx.clearRect(0, 0, this.winW, this.winH);
    },
    drawScore: function() {             
        this.scoreboard.update(this.score)
    },
    gameOver() {
        if (this.isCollision()||this.score == 0) {
            this.player._lives--
            clearInterval(this.interval)
            console.log("GAME OVER!")
        }
    },

    win: function() {
        if (this.bubbles[0] == undefined){
            //clearInterval(this.interval)
            if(this.level < 2){
            clearInterval(this.interval)
            this.level++
            this.start()
            console.log("YOU HAVE WON!")
            }
            else {
                clearInterval(this.interval)
            }
        }
    },

    newBonus: function () {
        if(this.framesCounter%500 == 0){
            this.bonus = (new Bonus(this.ctx, "bubble.png"))
        }
    },

    getBonus: function() {
        if (this.bonus != undefined){
            if (this.player._posX + this.player._width >= this.bonus._posX &&
                this.player._posX < this.bonus._posX + this.bonus._width){
                    this.player._lives++
                    this.bonus = undefined
                }
            }
    }

}