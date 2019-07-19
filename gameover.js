class Result {
    constructor(ctx, url){
        this._ctx = ctx
        this._image = new Image
        this._image.src = url
        this._width = 400
        this._height = 400
        this._posX = 300
        this._posY = window.innerHeight - this._height-20
    }
    draw() {
        this._ctx.drawImage(this._image,this._posX, this._posY, this._width, this._height)
    }
}