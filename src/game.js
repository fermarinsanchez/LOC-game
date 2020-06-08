class Game {
    constructor(ctx) {
      this.ctx = ctx;
      this.intervalId = null;
      this.tick = 0
  
      this.bg = new Board(ctx)
      this.nucleus = new Nucleus(ctx)
      this.players = []
      this.waste = new Waste(ctx)
      this.enemiesOne = new ChemicalPeople(ctx)
      this.wastedEl = []
      this.walls = []
      this.enemiesOneArr = []
      this.skullsArr = []

      this.skullImg = new Image()
      this.skullImg.src = './img/player_dead.png'

      this.score = 0
      this.time = 60
      this.tick = 0
      this.stillAlive = 2
      
      this._addWaste(this.waste, 10)
      // this._addPlayers()
    }
  
    start() {

      this.intervalId = setInterval(() => {
        this._clear()
        this._draw()
        this._move()
        this._logicWinOrLose()
        this._addWalls()
        this._checkCollisions()
        this._pickOrStepWaste()
        this._wasteInNucleus()
        this._addEnemies()
        this._checkCollisionsWithEnemies()
  
      }, 1000 / 60)
    }
  
    _clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

  
    _draw() {
      if (this.tick++ > 10000) {
        this.tick = 0
      }
      this.bg.draw()
      this.walls.forEach(el => el.draw())
      this.wastedEl.forEach(el => el.draw())
      this.enemiesOneArr.forEach(el => el.draw())
      this.players.forEach(player => player.draw())
      this.nucleus.draw()
      
    }

    
  
    _move() {
      this.players.forEach(player => player.health > 0 ? player.move() : null)
      this.enemiesOneArr.forEach(e => e.move())
  
    }

    _addWalls() {
      const wallTop = new Wall(ctx, 0, 0, 800, 50, 'top')
      const wallLeft = new Wall(ctx, 0, 0, 50, 800, 'left')
      const wallBottom = new Wall(ctx, 0, 750, 800, 50, 'bottom')
      const wallRightTop = new Wall(ctx, 750, 0, 50, 300, 'right')
      const wallRightBottom = new Wall (ctx, 750, 500, 50, 450, 'right')
      this.walls.push(wallTop)
      this.walls.push(wallBottom)
      this.walls.push(wallLeft)
      this.walls.push(wallRightTop)
      this.walls.push(wallRightBottom)
    }
  
    
    _addOnePlayer() {
      this.players.push(new Player(ctx))
      const healthRounded1 = Math.floor(this.players[0].health)
      healthOne.value =  `${healthRounded1}`
      // gameScore1.innerText = `${this.players[0].score}` 
      //   // const healthRounded2 = Math.floor(this.players[1].health)
        
        // healthTwo.value =  `${healthRounded2}`
  
        
        // gameScore2.innerText = `${this.players[1].score}`
    }

    _addTwoPlayers() {
      this.players.push(new Player(ctx), new Player2(ctx))
      const healthRounded1 = Math.floor(this.players[0].health)
      const healthRounded2 = Math.floor(this.players[1].health)
      healthOne.value =  `${healthRounded1}`
      healthTwo.value =  `${healthRounded2}`

    }

    _addWaste(waste,len) {
      for (let i = 0; i < len; i++) {
        this.wastedEl.push(new Waste(ctx))
      }
      return this.wastedEl
    }

    _addEnemies() {
      if (this.tick % 150 === 0) {
        const newEnemy = new ChemicalPeople(this.ctx)
        this.enemiesOneArr.push(newEnemy)
      }
    }

    _stopPlayer(player, wall) {
 
        switch(wall.side) {
          case 'top':
            player.y = wall.h 
            this.vy = 0
            break;
          case 'bottom':
            player.y = this.ctx.canvas.height - wall.h - player.h
            this.vy = 0
            break;
          case 'left':
            player.x = wall.w
            this.xy = 0
            break;
          case 'right':
            player.x = this.ctx.canvas.width - wall.w - player.w
            break;
        }

      
    }

    _checkCollisions() {
      this.players.some(player => {
        this.walls.forEach(wall => {
          if (wall.collide(player).colission) {
            this._stopPlayer(player, wall)
          }
        })
        if (player.x + player.w > this.ctx.canvas.width) {
          player.x = this.ctx.canvas.width - player.w
        }
      })

      if(this.players.length === 2) {
        if(this.players[0].collide(this.players[1])) {
          this.players[0].vx = 0
          this.x = this.ctx.canvas.width - this.w
          this.players[0].vy = 0
          this.y = this.ctx.canvas.height - this.h
        }
  
        if(this.players[1].collide(this.players[0])) {
          this.players[1].vx = 0
          this.x = this.ctx.canvas.width - this.w
          this.players[1].vy = 0
          this.y = this.ctx.canvas.height - this.h
        }
      }

      
      
    }

   
    
    _pickOrStepWaste() {
      
      this.players.forEach(player => {
        this.wastedEl.forEach(el => {
          if (el.collide(player)) {
            if(!player.takeWaste) {
              const index = this.wastedEl.indexOf(el)
              if (index > -1) { this.wastedEl.splice(index, 1) }
              player.takeWaste = true
            }
  
            if (player.takeWaste) {
              player.health -= 0.1
              let index =  this.players.indexOf(player)
              const healthProgress = Array.from(HEALTHS)
              healthProgress[index].value = player.health
              return true
              
            }
          }
        })
      })
    }

    _checkCollisionsWithEnemies() {

      this.players.some(player => {
        return this.enemiesOneArr.some(el => {
          if (el.collide(player)) {
            player.health -= 1
            let index =  this.players.indexOf(player)
            const healthProgress = Array.from(HEALTHS)
            healthProgress[index].value = player.health
            
            return true
          }
        })
      })
      
    }
    

    _wasteInNucleus() {
      
      this.players.forEach(player => {
        if (this.nucleus.collide(player) && player.takeWaste) {
          player.score += 50
          let index =  this.players.indexOf(player)
          const scoresParagraphs = Array.from(SCORES)

          scoresParagraphs[index].innerHTML = player.score
          player.takeWaste = false
          return true
        }
      })
      
    }

    gameTimer() {
      
      let countdownTimer = setInterval(() => {
        this.time -= 1
        document.querySelector('#timer').textContent = this.time
        if(this.time <= 0) {
          clearInterval(countdownTimer)
        }  

        if(healthOne.value <= 0 || healthTwo.value <= 0) {
          this.time = this.time
          clearInterval(countdownTimer)
        }
      },1000);
        
    }

    _logicWinOrLose() {
      
      if (!this.players.length) {
        this._gameOver()
      }

      this.players.forEach(player => {
        const safeZone = (player.x + player.w ) >= this.ctx.canvas.width

        if (player.health < 0)  {
          player.img.src = './img/player_dead.png'
          
          setInterval(() => {
            let index = this.players.indexOf(player)
            if (index > -1) { this.players.splice(index, 1) }
            }, 3000)
            
          player.itsAlive = false
        }

        // if (player) {
        //   this._gameOver()
        // }
        
        
         
        // if (!player.itsAlive) {
        //   this._gameOver()
        // }

        if(this.time <= 0 && safeZone && !player.takeWaste) {
          clearInterval(this.intervalId)
          this._gameWin()
        }  
        
        if (!this.wastedEl.length && safeZone && !player.takeWaste) {
          clearInterval(this.intervalId)
          this._gameWin()
        }
  
        if (this.time <= 0 && safeZone && player.takeWaste) {
          clearInterval(this.intervalId)
          this._gameOver()
        }
  
        if (this.time <= 0 && !safeZone) {
          clearInterval(this.intervalId)
          this._gameOver()
        }
        
      })
     
    }

    _onlyOneLose(player) {
      player.img.src = './img/player_dead.png'
      player.itsAlive = false
      this.stillAlive -= 1

      if( this.players.length === 2) {
        if(!this.players[0].itsAlive && this.players[1].itsAlive || this.players[0].itsAlive && !this.players[1].itsAlive ) {
          this.stillAlive = 0
          console.log('still alive 0')
        }
      }

      

      if (this.stillAlive <= 0) {
        console.log('stillAlive zero and game over')
        this._gameOver()
      }

    }

    _gameWin() {
      this.ctx.font = "60px Helvetica";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "YOU WIN!",
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      );
    }
  
    _gameOver() {
      clearInterval(this.intervalId)
      this.ctx.font = "60px Helvetica";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "GAME OVER",
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      );
    }
  }