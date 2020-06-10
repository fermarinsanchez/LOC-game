class Player {
    constructor(ctx, playerNum) {
        this.ctx = ctx

        this.x = this.ctx.canvas.width - 50
        this.y = this.ctx.canvas.height / 2

        this.w = 101
        this.h = 79
        
        this.vx = 0
        this.vy = 0

        this.img = new Image()
        this.img.src = './img/Spritesheet_P1_Sin.png'
        this.img.frames = 4
        this.img.frameIndex = 0
        this.img.stay = 4
        this.img.stayIndex = 0

        this.imgTrue = new Image()
        this.imgTrue.src = './img/Spritesheet_P1_Con.png'

        this.score = 0
        this.health = 100

        this.takeWaste = false
        this.itsAlive = true

        this.tick = 0  

        this.playerNum = playerNum
    }


    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            this.img.stayIndex * this.img.height /this.img.stay,
            this.img.width / this.img.frames,
            this.img.height / this.img.stay,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }

    move() {
        this._setListeners()
        
        this.x += this.vx
        this.y += this.vy
    }

    _setListeners() {
        document.addEventListener('keydown', e => {
          switch (e.keyCode) {
            case KEY_UP:
              this.vy = -3
              this.img.stayIndex = 3
              this.animate()
              break;
            case KEY_LEFT:
              this.vx = -3
              this.img.stayIndex = 2
              this.animate()
              break;
            case KEY_RIGHT:
              this.vx = 3
              this.img.stayIndex = 1
              this.animate()
              break;
            case KEY_DOWN:
              this.vy = 3
              this.img.stayIndex = 0
              this.animate()
              // this.shot.play()
              break;
          }
        })
    
        document.addEventListener('keyup', e => {
            switch (e.keyCode) {
                case KEY_UP:
                  this.vy = 0
                  break;
                case KEY_LEFT:
                  this.vx = 0
                  break;
                case KEY_RIGHT:
                  this.vx = 0
                  break;
                case KEY_DOWN:
                  this.vy = 0
                  // this.shot.play()
                  break;
              }
        })
    }

    animate() {
      this.tick++
      if (this.tick > 1) {
          if (this.img.frameIndex++ === 3) {
              this.img.frameIndex = 0;
          };
      };

      if (this.tick === 1000) {
          this.tick = 0;
      };
  }

    collide(el) {
      const collideX = el.x + el.w > this.x && el.x < this.x + this.w
      const collideY = el.y < this.y + this.h && el.y + el.h > this.y

      return  collideX && collideY     
  }

}