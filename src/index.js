const ctx = document.getElementById('canvas').getContext('2d')

const game1P = new Game(ctx, 20, 60)
const game2P = new Game(ctx, 45, 90)

const menu = document.querySelector('.menu')
const start1btn = document.querySelector('#start-1')
const start2btn = document.querySelector('#start-2')
const instructBtn = document.querySelector('#instruct-btn')
const instructPage = document.querySelector('.instructions')
const instToMenu = document.querySelector('.inst-to-menu')
const takeReady = document.querySelector('#count-down > p')
const twoPlayers = document.querySelector('#player-2')

start1btn.addEventListener('click', () => {

    menu.classList.toggle('is-hidden')

    const first = setTimeout(() =>{
        readyMp3.play()
        takeReady.classList.toggle('ready')
        takeReady.innerText = 'READY...'
      }, 1000)
     
    const second = setTimeout(() => {
        steadyMp3.play()
        clearInterval(first)
        takeReady.innerText = 'STEADY...'
    }, 2000)
      
    const third = setTimeout(() => {
        goMp3.play()
        clearInterval(second)
        takeReady.innerText = 'GO!!!'
    }, 3000)

    const start = setTimeout(() => {
        bgMusic.play()
        clearInterval(third)
        takeReady.innerText = ''
        takeReady.classList.toggle('ready')
        game1P._addOnePlayer()
        game1P.start()
        game1P.gameTimer()
    }, 4000)
    
})

start2btn.addEventListener('click', () => {

    menu.classList.toggle('is-hidden')

    const first = setTimeout(() =>{
        readyMp3.play()
        takeReady.classList.toggle('ready')
        takeReady.innerText = 'READY...'
      }, 1000)
     
    const second = setTimeout(() => {
        steadyMp3.play()
        clearInterval(first)
        takeReady.innerText = 'STEADY...'
    }, 2000)
      
    const third = setTimeout(() => {
        goMp3.play()
        clearInterval(second)
        takeReady.innerText = 'GO!!!'
    }, 3000)

    const start = setTimeout(() => {
        bgMusic.play()
        clearInterval(third)
        takeReady.innerText = ''
        takeReady.classList.toggle('ready')
        twoPlayers.classList.toggle('is-hidden')
        game2P._addTwoPlayers()
        game2P.start()
        game2P.gameTimer()
    }, 4000)
    
})

instructBtn.addEventListener('click', () => {
    instructPage.classList.toggle('is-hidden')
})

instToMenu.addEventListener('click', () => {
    instructPage.classList.toggle('is-hidden')
})
