class Player2 {
  constructor(ctx, playerNum) {
      this.ctx = ctx
      this.x = this.ctx.canvas.width - 50
      this.y = (this.ctx.canvas.height / 2) + 80
      this.w = 101
      this.h = 79
      this.vx = 0
      this.vy = 0
      this.v = 3
      this.img = new Image()
      this.img.src = './img/Spritesheet_P2_Sin.png'
      this.img.frames = 4
      this.img.frameIndex = 0
      this.img.stay = 4
      this.img.stayIndex = 0
      this.score = 0
      this.health = 100
      this.takeWaste = false
      this.wasteClear = 0
      this.itsAlive = true
      this.tick = 0 
      this.actions = {
        up : false,
        left: false,
        down: false,
        right: false
      }
      this.playerNum = playerNum
      this.setListenners()
  }
  draw() {
    this.checkIfDead()
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
      if (this.actions.up || this.actions.down || this.actions.left || this.actions.right) this.animate()
  }
  setListenners() {
    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case KEY_UP2:
          this.actions.up = true
          this.vy = -this.v
          this.img.stayIndex = 3
          walkMp3.play()
          break;
        case KEY_LEFT2:
          this.actions.left = true
          this.vx = -this.v
          this.img.stayIndex = 2
          walkMp3.play()
          break;
        case KEY_RIGHT2:
          this.actions.right = true
          this.vx = this.v
          this.img.stayIndex = 1
          walkMp3.play()
          break;
        case KEY_DOWN2:
          this.actions.down = true
          this.vy = this.v
          this.img.stayIndex = 0
          walkMp3.play()
          break;
      }
    })
    document.addEventListener('keyup', e => {
      switch (e.keyCode) {
          case KEY_UP2:
            this.actions.up = false
            this.vy = 0
            break;
          case KEY_LEFT2:
            this.actions.left = false
            this.vx = 0
            break;
          case KEY_RIGHT2:
            this.actions.right = false
            this.vx = 0
            break;
          case KEY_DOWN2:
            this.actions.down = false
            this.vy = 0
            break;
        }
    })
  }
  move() {
    if (this.actions.up) {
        this.vy = -this.v
        this.img.stayIndex = 3
        walkMp3.play()
    } 
    if (this.actions.left) {
        this.vx = -this.v
        this.img.stayIndex = 2
        walkMp3.play()
    }
    if (this.actions.right) {
        this.vx = this.v
        this.img.stayIndex = 1
        walkMp3.play()
    }
    if (this.actions.down) {
        this.vy = this.v
        this.img.stayIndex = 0
        walkMp3.play()
    }
      this.x += this.vx
      this.y += this.vy
  }
  checkIfDead() {
    if (this.health <= 0) {
      this.img.src = './img/Spritesheet_skull.png'
      deadMp3.play()
    }
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