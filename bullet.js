class Bullet {
    constructor (ctx, playerX) {
        this._ctx = ctx
        this._posX = playerX
        this._posY0 = window.innerHeight
        this._posY = this._posY0
        //this._winH = undefined
        this._velY = -.001
        this._width = 20
    }
    draw() {
        this._ctx.strokeStyle = 'red'
        this._ctx.lineWidth = this._width
        this._ctx.beginPath()
        this._ctx.moveTo(this._posX, this._posY0)
        this._ctx.lineTo(this._posX, this._posY)
        this._ctx.stroke()
    }
    move() {
        
            this._posY -= 10
        
    }

    clear() {

    }

}