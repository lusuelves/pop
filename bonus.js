class Bonus {
    constructor (ctx,url) {
        this._ctx = ctx
        this._posX = Math.random()*(window.innerWidth-50) + 50 
        this._posY = 0
        this._width = 20
        this._height = this._width
        this._image = new Image
        this._image.src = url
    }
    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
    }
    move() {
        if (this._posY < window.innerHeight - 42)
            this._posY += 10
    }
}