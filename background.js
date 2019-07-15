class Background {
    constructor(ctx, url){
        this._ctx = ctx,
        this._winW = window.innerWidth,
        this._winH = window.innerHeight,
        this._image = new Image,
        this._image.src = url,
        this._posX = 0,
        this._posY = 0
    }
    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._winW, this._winH) 
    }
}