class Bullet {
    constructor (ctx, playerX, playerW) {
        this._ctx = ctx
        this._posX = playerX + playerW/2
        this._posY0 = window.innerHeight - 20
        this._posY = this._posY0
        this._velY = -.001
        this._width = 10
        this._color = 'red'
    }
    draw() {
        this._ctx.strokeStyle = this._color
        this._ctx.lineWidth = this._width
        this._ctx.beginPath()
        this._ctx.moveTo(this._posX, this._posY0)
        this._ctx.lineTo(this._posX, this._posY)
        this._ctx.stroke()
        this._ctx.closePath()
    }
    move() {
            this._posY -= 10  
    }
}