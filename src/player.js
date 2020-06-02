class Player {
    constructor(ctx) {
        this.ctx = ctx

        this.x = this.ctx.canvas.width - 50
        this.y = this.ctx.canvas.height / 2

        this.w = 56
        this.h = 56
        
        this.vx = 0
        this.vy = 0

        this.img = new Image()
        this.img.src = './img/Player_LOC_28x28.jpg'

        this.takeWaste = false

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


    // checkBoardBorders() {
    //     if (this.y + this.h < this.boardLimits.y1) {
    //       this.y = this.boardLimits.y1 - this.h 
    //     } 

    // checkBoardBorders() {
    //     if (this.y + this.h < this.boardLimits.y1) {
    //       this.y = this.boardLimits.y1 - this.h -50
    //     } 
        
        // if (this.y  <= 50) {
        //   this.y = this.h
        // }

        // if (this.x + this.w > this.boardLimits.y3) {
        //   this.x = this.boardLimits.y3 - this.w - 50
        // }

        // if (this.x  <= 50) {
        //   this.x = this.w 
        // }
    // }

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
              break;
            case KEY_LEFT:
              this.vx = -3
              break;
            case KEY_RIGHT:
              this.vx = 3
              break;
            case KEY_DOWN:
              this.vy = 3
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

}