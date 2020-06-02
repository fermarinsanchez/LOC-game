class Waste {
    constructor(ctx) {
        this.ctx = ctx
        
        this.x = Math.floor(Math.random() * 650 ) + 55
        this.y = Math.floor(Math.random() * 650 ) + 55
        
        this.h = 50
        this.w = 50

        this.img = new Image()
        this.img.src = './img/Mat_Radioactivo_28x28.jpg'
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y

        return collideX && collideY
    }
}