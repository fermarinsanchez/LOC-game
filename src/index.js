const ctx = document.getElementById('canvas').getContext('2d')

const game = new Game(ctx, 20, 100)

const menu = document.querySelector('.menu')
const start1btn = document.querySelector('#start-1')
const start2btn = document.querySelector('#start-2')
const takeReady = document.querySelector('#count-down > p')
const twoPlayers = document.querySelector('#player-2')
console.log(twoPlayers)

start1btn.addEventListener('click', () => {

    menu.classList.toggle('is-hidden')

    const first = setTimeout(() =>{
        takeReady.classList.toggle('ready')
        takeReady.innerText = 'READY...'
      }, 1000)
     
    const second = setTimeout(() => {
        clearInterval(first)
        takeReady.innerText = 'STEADY...'
    }, 2000)
      
    const third = setTimeout(() => {
        clearInterval(second)
        takeReady.innerText = 'GO!!!'
    }, 3000)

    const start = setTimeout(() => {
        clearInterval(third)
        takeReady.innerText = ''
        takeReady.classList.toggle('ready')
        game._addOnePlayer()
        game.start()
        game.gameTimer()
    }, 4000)
    
})

start2btn.addEventListener('click', () => {

    menu.classList.toggle('is-hidden')

    const first = setTimeout(() =>{
        takeReady.classList.toggle('ready')
        takeReady.innerText = 'READY...'
      }, 1000)
     
    const second = setTimeout(() => {
        clearInterval(first)
        takeReady.innerText = 'STEADY...'
    }, 2000)
      
    const third = setTimeout(() => {
        clearInterval(second)
        takeReady.innerText = 'GO!!!'
    }, 3000)

    const start = setTimeout(() => {
        clearInterval(third)
        takeReady.innerText = ''
        takeReady.classList.toggle('ready')
        twoPlayers.classList.toggle('is-hidden')
        game._addTwoPlayers()
        game.start()
        game.gameTimer()
    }, 4000)
    
})
