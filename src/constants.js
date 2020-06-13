
// player 1 keys:

const KEY_UP = 38
const KEY_DOWN = 40
const KEY_LEFT = 37
const KEY_RIGHT = 39

//player 2 keys:

const KEY_UP2 = 87
const KEY_DOWN2 = 83
const KEY_LEFT2 = 65
const KEY_RIGHT2 = 68

const SCORES =  document.querySelectorAll('.score')
const HEALTHS = document.querySelectorAll('.health')


let healthOne = document.getElementById('health-1')
let healthTwo = document.getElementById('health-2')

// const safeZone = (this.player.x + this.player.w ) >= this.ctx.canvas.width - 65

const ready = document.querySelector('.ready p')

const wasteCounter = document.querySelector('span.waste-array')

const redAlert = document.querySelector('#timer')

// audio files:

const readyMp3 = new Audio('./sound/Ready_LOC.mp3')
const steadyMp3 = new Audio('./sound/Stead_LOC.mp3')
const goMp3 = new Audio('./sound/Go_LOC.mp3')
const gameOverMp3 = new Audio('./sound/GameOver_LOC.mp3')
const P1WinMp3 = new Audio('./sound/P1Wins_LOC.mp3')
const P2WinMp3 = new Audio('./sound/P2Wins_LOC.mp3')
const drawMp3 = new Audio('./sound/Draw_LOC.mp3')
const returnSafeMp3 = new Audio('./sound/SafeZone_LOC.mp3')

const powerUpMp3 = new Audio('./sound/powerUpSynth.mp3')
const walkMp3 = new Audio('./sound/footSteps.mp3')
const digMp3 = new Audio('./sound/Digging.mp3')
const leaveWasteMp3 = new Audio('./sound/LeaveWaste.mp3')
const coinsMp3 = new Audio('./sound/Coins.mp3')
const deadMp3 = new Audio('./sound/Dead.mp3')
const ouchMp3 = new Audio('./sound/Ouch.mp3')
const zombieMp3 = new Audio('./sound/Zombie.mp3')
const spiderMp3 = new Audio('./sound/Spider.mp3')
const geigerMp3 = new Audio('./sound/Geiger.mp3')
const bgMusic = new Audio('./sound/radioactivity.mp3')



// mixing volume of elements
walkMp3.volume = 0.2
zombieMp3.volume = 0.3
digMp3.volume = 0.7
bgMusic.volume = 0.3
powerUpMp3.volume = 0.5




