class Player {
    constructor(ctx, url, keys){
        this._ctx = ctx
        this._image = new Image
        this._image.src = url
        this._height = 200
        this._width = 150
        this._posX = window.innerWidth/2
        this._posY = window.innerHeight - 220
        this._keys = keys
        this._velX = 30
        this._bullet = undefined
        this._bullets = []
        this.setListeners()
    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width,this._height)
        if(this._bullets[0] != undefined) this._bullets[0].draw()
    }

    goRight() {
        this._posX += this._velX
    }

    goLeft() {
        this._posX -= this._velX
    }

    setListeners() {
        document.onkeydown = (e) => {
            if (e.keyCode === this._keys.RIGHT) {
                this.goRight()
            }
            if (e.keyCode === this._keys.LEFT) {
                this.goLeft()
            }
            if (e.keyCode === this._keys.b) {
                this._bullet = new Bullet(this._ctx, this._posX)
                console.log(this._bullet)
                this._bullets.push(this._bullet)
                console.log(this._bullets[0])
            }
        }
    }

}