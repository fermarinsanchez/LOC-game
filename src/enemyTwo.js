class SpiderRad {
    constructor(ctx) {
        this.ctx = ctx
        
        this.x = 700
        this.y = Math.floor(Math.random() * (this.ctx.canvas.height - 300))

        this.w = 40
        this.h = 63

        this.vx = -3
        this.vy = 0

        this.tick = 0

        this.img = new Image()
        this.img.src = './img/Enemigo_Araña.png'
        this.img.frames = 4
        this.img.frameIndex = 0
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
          )
        this.animate()
    }

    move() {
        this.x += this.vx
    }

    animate() {
        if (this.tick++ > 5) {
          this.tick = 0;
          this.img.frameIndex++;
        }
        if (this.img.frameIndex >= this.img.frames - 1) {
          this.img.frameIndex = 0;
        }
    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y

        return  collideX && collideY     
    }
}