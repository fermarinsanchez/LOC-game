class Game {
    constructor(ctx, wasteNum, time) {
      this.ctx = ctx;
      this.intervalId = null;
      this.tick = 0
  
      this.bg = new Board(ctx)
      this.nucleus = new Nucleus(ctx)
      this.players = []
      this.enemiesOne = new ChemicalPeople(ctx)
      this.waste = new Waste(ctx)
      this.wastedEl = []
      this.wasteNum = wasteNum
      this.walls = []
      this.enemiesOneArr = []
      this.skullsArr = []

      this.skullImg = new Image()
      this.skullImg.src = './img/player_dead.png'

      this.score = 0
      this.time = time
      this.tick = 0
      this.stillAlive = 2
      
      this._addWaste(this.waste, this.wasteNum)
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
      this.players.forEach(player => {
        if (player.itsAlive) {
          setTimeout(player.draw(), 2000)
        } else { null }
      })
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
      this.players.push(new Player(ctx, 1))
      const healthRounded1 = Math.floor(this.players[0].health)
      healthOne.value =  `${healthRounded1}`
    }

    _addTwoPlayers() {
      this.players.push(new Player(ctx,1), new Player2(ctx, 2))
      const healthRounded1 = Math.floor(this.players[0].health)
      const healthRounded2 = Math.floor(this.players[1].health)
      healthOne.value =  `${healthRounded1}`
      healthTwo.value =  `${healthRounded2}`

    }

    _addWaste(waste,len) {
      for (let i = 0; i < len; i++) {
        this.wastedEl.push(new Waste(ctx))
      }
      wasteCounter.innerHTML = `WASTE REMAINS   X    ${this.wastedEl.length}`
      return this.wastedEl
    }

    _addEnemies() {
      if (this.tick % 350 === 0) {
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
      // this.players.forEach(player1 => {
      //   this.players.forEach(player2 => {
      //     if(player1.collide(player2)) {
      //       this.player1.x = this.ctx.canvas.width - 
      //     }
      //   })
      // })
      // if(this.players.length === 2) {
      //   if(this.players[0].collide(this.players[1])) {
      //     this.players[0].vx = 0
          
      //     this.players[0].vy = 0
         
      //   }
  
      //   if(this.players[1].collide(this.players[0])) {
      //     this.players[1].vx = 0
         
      //     this.players[1].vy = 0
          
      //   }
      // }

      
      
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

            if (player.takeWaste && (player.playerNum === 1)) {
              player.img.src = './img/Spritesheet_P1_Con.png'
            }
            if (player.takeWaste && (player.playerNum === 2)) {
              player.img.src = './img/Spritesheet_P2_Con.png'
            }
  
            if (player.takeWaste) {
              player.health -= 0.1
              
              const healthProgress = Array.from(HEALTHS)
              healthProgress[player.playerNum -1].value = player.health
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
           
            const healthProgress = Array.from(HEALTHS)
            healthProgress[player.playerNum -1].value = player.health
            
            return true
          }
        })
      })
      
    }
    
    
    _wasteInNucleus() {
      
      this.players.forEach(player => {
        if (this.nucleus.collide(player) && player.takeWaste) {
          player.score += 50
          wasteCounter.innerHTML = `WASTE REMAINS   X    ${this.wastedEl.length}`
          const scoresParagraphs = Array.from(SCORES)

          scoresParagraphs[player.playerNum -1].innerHTML = player.score
          player.takeWaste = false
          player.wasteClear += 1
          if (!player.takeWaste && (player.playerNum === 1)) {
            player.img.src = './img/Spritesheet_P1_Sin.png'
          }
          if (!player.takeWaste && (player.playerNum === 2)) {
            player.img.src = './img/Spritesheet_P2_Sin.png'
          }
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

        if (this.players.length === 1) {
          if ( healthOne.value <= 0) {
            this.time = this.time
            clearInterval(countdownTimer)
            setInterval(this._gameOver(), 2000)
          }
         
        }

        if ( this.players.length === 2) {
          if(healthOne.value <= 0 && healthTwo.value <= 0) {
            this.time = this.time
            clearInterval(countdownTimer)
            setInterval(this._gameOver(), 2000)
          }
        }

        if (this.time === 0) {
          this._gameOver()
        }
       
      },1000);
        
    }

    _logicWinOrLose() {
      
      this.players.some(player => {
        const safeZone = (player.x + player.w ) >= this.ctx.canvas.width

        if (player.health <= 0)  {
          
          setInterval(() => {
            player.itsAlive = false
            }, 3000)
        }

        if(!this.wastedEl.length && safeZone && !player.takeWaste) {
          console.log('enter')
          this._gameOver()
          gamOver.innerText = `YOU WIN!!!`
          this.time = this.time
        }  
        
        // if (!this.wastedEl.length && safeZone && !player.takeWaste) {
        //   clearInterval(this.intervalId)
        //   this._gameOver()
        // }
  
        // if (this.time <= 0 && safeZone && player.takeWaste) {
        //   clearInterval(this.intervalId)
        //   this._gameOver()
        // }
  
        // if (this.time <= 0 && !safeZone) {
        //   clearInterval(this.intervalId)
        //   this._gameOver()
        // }
        
      })
     
    }

    // _onlyOneLose(player) {
    //   player.img.src = './img/Spritesheet_skull.png'
    //   player.itsAlive = false
    //   this.stillAlive -= 1

    //   if( this.players.length === 2) {
    //     if(!this.players[0].itsAlive && this.players[1].itsAlive || this.players[0].itsAlive && !this.players[1].itsAlive ) {
    //       this.stillAlive = 0
    //       console.log('still alive 0')
    //     }
    //   }

      

    //   if (this.stillAlive <= 0) {
    //     console.log('stillAlive zero and game over')
    //     this._gameOver()
    //   }

    // }
  
    _gameOver() {
      
      const gameOver = document.querySelector('#game-over')
      const winLose = document.querySelector('#win-lose')
      const p1Score = document.querySelector('#p1-score')
      const wasteP1Done = document.querySelector('#waste-p1-done')
      const p2Score = document.querySelector('#p2-score')
      const wasteP2Done = document.querySelector('#waste-p2-done')
      const finalWaste = document.querySelector('#waste-final')
      const hiddenP2 = document.querySelector('.p2')
      const winnerMsg = document.querySelector('#winner')

      winLose.innerText = 'GAME OVER'
      

      if (this.players.length === 1) {
        p1Score.innerText = `Player 1 Score: ${this.players[0].score}`
        wasteP1Done.innerText = `wastes removed: ${this.players[0].wasteClear}`
        finalWaste.innerHTML =  `remains ${this.wastedEl.length} wastes in MASHA`
        gameOver.classList.toggle('is-hidden')
        
        this.players.some(player => {
          const safeZone = (player.x + player.w ) >= this.ctx.canvas.width
  
          if(!this.wastedEl.length && safeZone && !player.takeWaste) {
            winLose.innerText = `YOU WIN!!!`
          }  
    
          // if (this.time === 0) {
          //  this._gameOver()
          // }
          
        })
      }

      if (this.players.length === 2) {
        p1Score.innerText = `Player 1 Score: ${this.players[0].score}`
        wasteP1Done.innerText = `wastes removed: ${this.players[0].wasteClear}`
        p2Score.innerText = `Player 2 Score: ${this.players[1].score}`
        wasteP2Done.innerText = `wastes removed: ${this.players[1].wasteClear}`
        finalWaste.innerHTML =  `remains ${this.wastedEl.length} wastes in MASHA`
        gameOver.classList.toggle('is-hidden')
        hiddenP2.classList.toggle('is-hidden')

        // if ( this.players[0].score >= this.player[1].score) {
        //   winLose.innerText = `PLAYER 1 WIN!!!`
        // } else { winLose.innerText = `PLAYER 2 WIN!!!` }
        // }
        

          const logicWin = (this.players[0].score) > (this.players[1].score)
          const logicDraw = (this.players[0].score) === (this.players[1].score)

          if(logicWin) {
            winLose.innerText = `PLAYER 1 WIN!!!`
          } else if(logicDraw) {
            winLose.innerText = `DRAW!!!`
          } else { winLose.innerText = `PLAYER 2 WIN!!!` }

          // if(this.time === 0 && ((player.playerNum === 1 && player.score) >= (player.playerNum === 2 && player.score)) && !this.wastedEl.length) {
          //   winLose.innerText = `PLAYER 1 WIN!!!`
          // } else { winLose.innerText = `PLAYER 2 WIN!!!` }

    
      }


      
      // this.ctx.save()
      // this.ctx.font = "60px Helvetica";
      // // this.ctx.textAlign = "center";
      // this.ctx.fillText(
      //   "GAME OVER",
      //   this.ctx.canvas.width / 2,
      //   this.ctx.canvas.height / 2
      // );
      // this.ctx.restore()
       clearInterval(this.intervalId)
    }
  }