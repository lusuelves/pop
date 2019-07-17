const Game = {
    canvas: undefined,
    ctx: undefined,
    winW: undefined,
    winH: undefined,
    fps: 60,
    bubbles: [],
    keys: {
        LEFT: 37,
        SHOOT: 38,
        RIGHT: 39,
    },
    keys1: {
        LEFT: 65,
        RIGHT: 68,
        SHOOT: 87
    },
    framesCounter: 0,
    level: 1,
    score: 1000,
    lives: undefined,
    bonus: undefined,
    players: [],
    numPlayers: 1,

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
            this.moveAll()
            this.drawAll()
            for(let i = 0; i < this.players.length; i++){
                this.newBubble(i)
            }
            this.newBonus()
            this.getBonus()
            this.clearBullet()
            this.gameOver()
            this.muerte()
            this.win()
        },1000/this.fps)
    },

    components: function () {
        if(this.level == 1){
        this.background = new Background(this.ctx, "fondoPlanets.png")
        this.players.push(new Player(this.ctx, "louAttacks2.png", this.keys))
        this.insertBubbles()
        if (this.numPlayers == 2)
            {this.players.push(new Player(this.ctx, "nereo.png", this.keys1)) 
            this.players[1]._height = 120
            this.players[1]._width = 100
            this.players[1]._posY = window.innerHeight - this.players[1]._height - 20
            this.players[1]._distanceScore = 2
            this.players[1]._color = "blue"
            console.log(this.players[1]._bullets)
            this.players[1]._color = "blue"}
        }
        
        if(this.level == 2){
            this.background = new Background(this.ctx, "fondoAzul.jpeg")
            this.insertBubbles()
            }
        if(this.level == 3){
            this.background = new Background(this.ctx, "level3.jpeg")
            this.insertBubbles()
        }
    },
    insertBubbles: function () {
        if(this.level == 1){
            this.bubble = new Bubble(this.ctx, "bubble.png", 70, 0,0)
            this.bubbles.push(this.bubble)
            }
        if(this.level == 2){
            this.bubble = new Bubble(this.ctx, "florMorada.png", 120, 0,0)
            this.bubbles.push(this.bubble)
            }
        if(this.level == 3) {
            this.bubble = new Bubble(this.ctx, "tiburon.png", 120, 0,0)
            this.bubbles.push(this.bubble)
            this.bubble = new Bubble(this.ctx, "delfin.png", 120, 600,0)
            this.bubbles.push(this.bubble)

        }
    },
    drawAll: function () {
        this.background.draw()
        this.players.forEach(elm => elm.draw(this.framesCounter))
        if(this.bonus != undefined) this.bonus.draw()
        this.bubbles.forEach(elm => elm.draw())
        if(this.players.length==0) {   
            this.done = new GameOver(this.ctx, "nereoCaca.png")            
            this.done.draw()
            this.bubbles = []
            //clearInterval(this.interval)
        } 
        this.drawScore()
    },

    moveAll () {
        if(this.bonus != undefined)this.bonus.move()
            this.bubbles.forEach(elm => elm.move())
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i]._bullets[0] != undefined) 
                {this.players[i]._bullets[0].move()
            }
        }
    },

    isCollision(i) {
        return this.bubbles.some(elm => {
        return elm._posX + elm._width > this.players[i]._posX &&
            elm._posY + elm._height > this.players[i]._posY + 80 &&
            elm._posX < this.players[i]._posX + this.players[i]._width
        })},
    newBubble (i) {
        return this.bubbles.some((elm,idx) =>{
        if (this.players[i]._bullets[0] != undefined && elm._height > 100 &&
            elm._posX + elm._width >= this.players[i]._bullets[0]._posX
                &&
                elm._posX <= this.players[i]._bullets[0]._posX + this.players[i]._bullets[0]._width
                &&
                elm._posY + elm._height >= this.players[i]._bullets[0]._posY
        )
            {
            this.score += 200
            this.a = this.bubbles[idx]._posY - this.bubbles[idx]._height
            this.bubbles.splice(idx,1)
            if(this.level == 2)
            {
            this.bubble = new Bubble(this.ctx, "florAzul.png", 70, this.players[i]._bullets[0]._posX, this.a)
            this.bubble._velY = -1
            this.bubbles.push(this.bubble)
            this.bubble = new Bubble(this.ctx, "florRoja.png", 70, this.players[i]._bullets[0]._posX, this.a)
            this.bubble._velY = -1
            this.bubble._velX = -5
            this.bubbles.push(this.bubble)
            }
            if(this.level == 3){
                this.bubble = new Bubble(this.ctx, "estrella.png", 70, this.players[i]._bullets[0]._posX, this.a)
                this.bubble._velY = -1
                this.bubbles.push(this.bubble)
                this.bubble = new Bubble(this.ctx, "caracol.png", 70, this.players[i]._bullets[0]._posX, this.a)
                this.bubble._velY = -1
                this.bubble._velX = -5
                this.bubbles.push(this.bubble)
            }
            this.players[i]._bullets.splice(0,1)
        }
        if (this.players[i]._bullets[0] != undefined && elm._height > 50 &&
            elm._posX + elm._width >= this.players[i]._bullets[0]._posX
                &&
                elm._posX <= this.players[i]._bullets[0]._posX + this.players[i]._bullets[0]._width
                &&
                elm._posY + elm._height >= this.players[i]._bullets[0]._posY
        )
            {
            if(this.level == 2){
                this.url1 = "florAmarilla.png"
                this.url2 = "florNegra"
            }
            if(this.level == 3){
                this.url1 = "pez.png"
                this.url2 = "pulpo.png"
            }
            else{
                this.url1 = "bubble.png"
                this.url2 = this.url1
            }
            this.score += 100
            this.a = this.bubbles[idx]._posY - this.bubbles[idx]._height
            this.bubbles.splice(idx,1)
            this.bubble = new Bubble(this.ctx, this.url1, 40, this.players[i]._bullets[0]._posX, this.a)
            this.bubble._velY = -1
            this.bubbles.push(this.bubble)
            this.bubble = new Bubble(this.ctx, this.url2, 40, this.players[i]._bullets[0]._posX, this.a)
            this.bubble._velY = -1
            this.bubble._velX = -5
            this.bubbles.push(this.bubble)
            this.players[i]._bullets.splice(0,1)
        }
        if(this.players[i]._bullets[0] != undefined && elm._height < 50 &&
            elm._posX + elm._width >= this.players[i]._bullets[0]._posX
            &&
            elm._posX <= this.players[i]._bullets[0]._posX + this.players[i]._bullets[0]._width
            &&
            elm._posY + elm._height >= this.players[i]._bullets[0]._posY)
            {
                this.score += 50
                this.bubbles.splice(idx,1)
                this.players[i]._bullets.splice(0,1)
            }
        })
    },
    clearBullet: function() {
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i]._bullets[0] != undefined){
                if(this.players[i]._bullets[0]._posY <= 0){
                    this.players[i]._bullets.splice(0,1)
                }
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
        for(let i = 0; i < this.players.length; i++){
            if (this.isCollision(i)||this.score == 0) {
                this.players[i]._lives--
                this.bubbles = []
                this.insertBubbles()
            }
        }
    },

    win: function() {
        if (this.bubbles[0] == undefined){
            if(this.level <= 3){
            clearInterval(this.interval)
            this.level++
            this.start()
            }
            //  else {
            //      clearInterval(this.interval)
            //      console.log("you have won")
            //  }
        }
    },

    newBonus: function () {
        if(this.framesCounter%500 == 0){
            this.bonus = (new Bonus(this.ctx, "bubble.png"))
        }
    },

    getBonus: function() {
        for(let i = 0; i < this.players.length; i++){
            if (this.bonus != undefined){
                if (this.players[i]._posX + this.players[i]._width >= this.bonus._posX &&
                    this.players[i]._posX < this.bonus._posX + this.bonus._width)
                    {
                    this.players[i]._lives++
                    this.bonus = undefined
                }
            }
        }
    },

    muerte: function () {
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i]._lives == 0){
                this.players.splice(i,1)
            }
        }
    }

}