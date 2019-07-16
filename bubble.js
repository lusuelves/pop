class Bubble {
    constructor (ctx, url, size, posX, posY) {
        this._ctx = ctx
        this._image = new Image
        this._image.src = url
        this._width = size
        this._height = size
        this._posX = posX
        this._posY = posY
        this._velX = 5
        this._velY = 2
        this._gravity = .25
    }
    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
    }
    move() {
        this._posX += this._velX
        this._velY += this._gravity
        this._posY += this._velY
        if (this._posY > window.innerHeight - this._height - 20)
            this._velY *= -1
        else if (this._posX > window.innerWidth - this._width ||this._posX < 0)
            this._velX *= -1
        // this._posY > window.innerHeight - this._height - 10? this._velY *= -1 : null
        // this._posX > window.innerWidth - this._width ? this._velX *= -1 : null
        // this._posX < 0 ? this._velX *= -1 : null
    }

}