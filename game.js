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
    bulletStatic: undefined,

    init: function () {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.winW = window.innerWidth
        this.winH = window.innerHeight
        this.canvas.width = this.winW
        this.canvas.height = this.winH
    },
    start: function () {
        this.song = document.getElementById("BlackDog")
        this.song.play()
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
            this.outOfOrbit()
        },1000/this.fps)
    },

    components: function () {
        if(this.level == 1){
        this.background = new Background(this.ctx, "fondoNegro.jpeg")
        this.players.push(new Player(this.ctx, "louAttacks2.png", this.keys))
        this.insertBubbles()
        if (this.numPlayers == 2)
            {this.players.push(new Player(this.ctx, "nereo.png", this.keys1)) 
            this.players[1]._height = 120
            this.players[1]._width = 100
            this.players[1]._posY = window.innerHeight - this.players[1]._height - 20
            this.players[1]._distanceScore = 2
            this.players[1]._color = "blue"
            this.players[1]._color = "blue"}
        }
        
        if(this.level == 2){
            this.background = new Background(this.ctx, "fondoAzul.jpeg")
            this.insertBubbles()
            }
        if(this.level == 3){
            this.background = new Background(this.ctx, "fondoMar.png")
            this.insertBubbles()
        }
        if(this.level == 4){
            this.background = new Background(this.ctx, "ironHack2.png")
            this.insertBubbles()
        }
    },
    insertBubbles: function () {
        if(this.level == 1){
            this.bubble = new Bubble(this.ctx, "planetBlanco.png", 70, 0,30)
            this.bubbles.push(this.bubble)
            }
        if(this.level == 2){
            this.bubble = new Bubble(this.ctx, "florMorada.png", 120, 0,30)
            this.bubbles.push(this.bubble)
            }
        if(this.level == 3) {
            this.bubble = new Bubble(this.ctx, "tiburon.png", 120, 300,30)
            this.bubble._limitX = 200
            this.bubbles.push(this.bubble)
            this.bubble = new Bubble(this.ctx, "delfin.png", 120, 600,30)
            this.bubble._limitX = 200
            this.bubbles.push(this.bubble)
        }
        if(this.level == 4) {
            this.song.pause()
            this.song = document.getElementById("Gorillaz")
            this.song.play()
            this.bubble = new Bubble(this.ctx, "german.png", 200, 300,30)
            this.bubbles.push(this.bubble)
        }
    },
    drawAll: function () {
        this.background.draw()
        if(this.players[1] != undefined && this.players[1]._bullets[0] != undefined) this.players[1]._bullets[0]._color = "blue"
        this.players.forEach(elm=>{
        if(elm._bullets[0] != undefined && elm._static == 1) elm._bullets[0]._color = "green"   
        })     
        this.players.forEach(elm => elm.draw(this.framesCounter))
        if(this.bonus != undefined) this.bonus.draw()
        if(this.bulletStatic != undefined) this.bulletStatic.draw()
        this.bubbles.forEach(elm => elm.draw())
        if(this.players.length == 0) {   
            this.result = new Result(this.ctx, "nereoCaca.png", this.winW, 400)            
            this.result.draw()
            this.bubbles = []
            this.song.pause()
            //clearInterval(this.interval)
        }
        else if(this.level == 5 && this.bubbles.length==0){
            this.result = new Result(this.ctx, "abrazo.svg", this.winW, 300)
            this.result.draw()
            this.bubbles = []
            this.song.pause()
            //clearInterval(this.interval)
        } 
        this.drawScore()
    },

    moveAll () {
        this.players.forEach(player=>player.move())

        if(this.bonus != undefined)this.bonus.move()
        if(this.bulletStatic != undefined)this.bulletStatic.move()

            this.bubbles.forEach(elm => elm.move())
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i]._bullets[0] != undefined) 
                {this.players[i]._bullets[0].move()
            }
        }
        if (this.level == 4) this.bubbles.forEach(bubble => bubble.collisionsLevel4())
    },

    isCollision(i) {
        return this.bubbles.some(elm => {
        return elm._posX + elm._width > this.players[i]._posX &&
            elm._posY + elm._height > this.players[i]._posY + 80 &&
            elm._posX < this.players[i]._posX + this.players[i]._width
        })},

    newBubble (i) {
        return this.bubbles.some((elm,idx) =>{
            if (this.players[i]._bullets[0] != undefined && elm._height > 170 &&
                elm._posX + elm._width >= this.players[i]._bullets[0]._posX
                    &&
                    elm._posX <= this.players[i]._bullets[0]._posX + this.players[i]._bullets[0]._width
                    &&
                    elm._posY + elm._height >= this.players[i]._bullets[0]._posY) 
            
                {
                console.log(elm._posY)
                this.score += 300
                this.a = this.bubbles[idx]._posY - this.bubbles[idx]._height
                this.bubbles.splice(idx,1)
                //level 4
                this.bubble = new Bubble(this.ctx, "teo.png", 160, this.players[i]._bullets[0]._posX, this.a)
                this.bubble._velY = -1
                this.bubbles.push(this.bubble)
                this.bubble = new Bubble(this.ctx, "raluca.png", 160, this.players[i]._bullets[0]._posX, this.a)
                this.bubble._velY = -1
                this.bubble._velX = -5
                this.bubbles.push(this.bubble)
                this.players[i]._bullets.splice(0,1)
                if(this.players[i]._static == 1)this.players[i]._static = 0
            }

        if (this.players[i]._bullets[0] != undefined && elm._height > 100 &&
            elm._posX + elm._width >= this.players[i]._bullets[0]._posX
                &&
                elm._posX <= this.players[i]._bullets[0]._posX + this.players[i]._bullets[0]._width
                &&
                elm._posY + elm._height >= this.players[i]._bullets[0]._posY)
    
            {
            this.score += 200
            this.a = this.bubbles[idx]._posY - this.bubbles[idx]._height
            this.bubbles.splice(idx,1)
            if(this.players[i]._static == 1) this.players[i]._static = 0
            if(this.level == 2)
            { this.url1 = "florAzul.png"
            this.url2 = "florRoja.png"}
            if(this.level ==3){
                this.url1 = "estrella.png"
                this.url2 = "caracol.png"
            }
            if(this.level == 4) {
                this.url1 = "inma.png"
                this.url2 = "alex.png"
            }
            this.bubble = new Bubble(this.ctx, this.url1, 90, this.players[i]._bullets[0]._posX, this.a)
            if(this.level == 3){this.bubble._limitX = 200}
            this.bubble._velY = -1
            this.bubbles.push(this.bubble)
            this.bubble = new Bubble(this.ctx, this.url2, 90, this.players[i]._bullets[0]._posX, this.a)
            if(this.level == 3){this.bubble._limitX = 200}
            this.bubble._velY = -1
            this.bubble._velX = -5
            this.bubbles.push(this.bubble)
            this.players[i]._bullets.splice(0,1)
            if(this.players[i]._static == 1)this.players[i]._static = 0
        }
    
        if (this.players[i]._bullets[0] != undefined && elm._height > 50 &&
            elm._posX + elm._width >= this.players[i]._bullets[0]._posX
                &&
                elm._posX <= this.players[i]._bullets[0]._posX + this.players[i]._bullets[0]._width
                &&
                elm._posY + elm._height >= this.players[i]._bullets[0]._posY
        )
            {
            if(this.level == 1){
                this.url1 = "planetRojo.png"
                this.url2 = "planetAzul.png"
            }
            if(this.level == 2){
                this.url1 = "florAmarilla.png"
                this.url2 = "florNegra.png"
            }
            if(this.level == 3){
                this.url1 = "pez.png"
                this.url2 = "pulpo.png"
            }
            if(this.level == 4){
                this.url1 = "esther.png"
                this.url2 = "josue.png"
            }
            this.score += 100
            this.a = this.bubbles[idx]._posY - this.bubbles[idx]._height
            this.bubbles.splice(idx,1)     
            this.bubble = new Bubble(this.ctx, this.url1, 50, this.players[i]._bullets[0]._posX, this.a)
            if(this.level == 3){this.bubble._limitX = 200}
            this.bubble._velY = -1
            this.bubbles.push(this.bubble)
            this.bubble = new Bubble(this.ctx, this.url2, 50, this.players[i]._bullets[0]._posX, this.a)
            if(this.level == 3){this.bubble._limitX = 200}
            this.bubble._velY = -1
            this.bubble._velX = -5
            this.bubbles.push(this.bubble)
            this.players[i]._bullets.splice(0,1)
            if(this.players[i]._static == 1)this.players[i]._static = 0
        }
        if(this.players[i]._bullets[0] != undefined && elm._height <= 50 &&
            elm._posX + elm._width >= this.players[i]._bullets[0]._posX
            &&
            elm._posX <= this.players[i]._bullets[0]._posX + this.players[i]._bullets[0]._width
            &&
            elm._posY + elm._height >= this.players[i]._bullets[0]._posY) 
            {
                this.score += 50
                this.bubbles.splice(idx,1)
                this.players[i]._bullets.splice(0,1)
                if(this.players[i]._static == 1)this.players[i]._static = 0
            }
        })
        
    },

    clearBullet: function() {
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i]._bullets[0] != undefined){
                if(this.players[i]._bullets[0]._posY <= 0 && this.players[i]._static == 0){
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
        if (this.bubbles[0] == undefined && this.players.length != 0){
            if(this.level <= 4){
            clearInterval(this.interval)
            this.level++
            this.start()
            }
              else {
                console.log("you have won")
           }
        }
    },

    newBonus: function () {
        if(this.framesCounter%500 == 0){
            this.bonus = (new Bonus(this.ctx, "bubble.png"))
        }
        if(this.framesCounter%800 == 0){
            this.bulletStatic = (new Bonus(this.ctx, "florAmarilla.png"))
        }
    },

    getBonus: function() {
        for(let i = 0; i < this.players.length; i++){
            if (this.bonus != undefined){
                if (this.players[i]._posX + this.players[i]._width >= this.bonus._posX &&
                    this.players[i]._posX < this.bonus._posX + this.bonus._width && this.bonus._posY > this.winH - this.players[i]._height)
                    {
                    this.players[i]._lives++
                    this.bonus = undefined
                }
            }
            if (this.bulletStatic != undefined){
                if (this.players[i]._posX + this.players[i]._width >= this.bulletStatic._posX &&
                    this.players[i]._posX < this.bulletStatic._posX + this.bulletStatic._width && this.bulletStatic._posY > this.winH - this.players[i]._height)
                    {
                    this.players[i]._static = 1
                    this.bulletStatic = undefined
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
    },

    outOfOrbit: function() {
        this.bubbles.forEach(elm=>{
            if(elm._posX<0) elm._posX = 5
            if( elm._posY < 0) elm._posY = 5
            if(elm._posY >= window.innerHeight) elm._posY = window.innerHeight - 5
            if(elm._posX >= window.innerWidth) elm._posX = window.innerWidth - 5
        })
    }

}