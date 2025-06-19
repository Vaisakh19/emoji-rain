const canvas= document.getElementById('gameCanvas');
const ctx=canvas.getContext('2d');// ctx used to draw on the canvas
const emojis = ["🍕", "🍩", "😄", "🍔", "🍎", "🎯"];
const emojiFalls=[];
let score=0;
let gameOver=false;
let keys={
    left:false,
    right:false
}

const player={
    width:50,
    height:20,
    speed:5,
    color:'white',
    x:0,
    y:0
}
player.x=(canvas.width/2)-(player.width/2);
player.y=(canvas.height-player.height);

//move the rectangle to either direction(set to true)
window.addEventListener('keydown',(e)=>{ 
    if(e.key==='ArrowLeft' || e.key==='a'){
        keys.left=true;
    }
    if(e.key==='ArrowRight' || e.key==='d'){
        keys.right=true;
    }
});

//stop moving the rectangle when key is released(set to false)
window.addEventListener('keyup',(e)=>{
    if(e.key==='ArrowLeft' || e.key==='a'){
        keys.left=false;
    }
    if(e.key==='ArrowRight' || e.key==='d'){
        keys.right=false;
    }
});

function createPlayer(){

    ctx.font='40px serif';
    ctx.fillText("🧺", player.x, player.y);
}

function updatePlayer(){
    if(keys.left){
        player.x -= player.speed;
        if(player.x < 0){
            player.x=0;
        }
    }
    if(keys.right) {
        player.x += player.speed;
        if(player.x + player.width > canvas.width){
            player.x = canvas.width - player.width;
        }
    }
}

function dropEmoji(){
    const emoji={
        char:emojis[Math.floor(Math.random()*emojis.length)],
        x:Math.random()*(canvas.width-30),
        y:-30,
        size:30,
        speed:2+Math.random()*1.5
    };
    emojiFalls.push(emoji);
}
setInterval(dropEmoji, 1000);

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateEmojis(){
    for(let emoji of emojiFalls){
        emoji.y += emoji.speed;
    }
}

function displayScore(){
    document.getElementById('score').innerText=`Score: ${score}`;
}

function drawEmojis(){
    ctx.font='30px serif';
    for(let emoji of emojiFalls){
        ctx.fillText(emoji.char, emoji.x, emoji.y);
    }
}

function checkCollision(){
    for(let i=emojiFalls.length-1;i>=0;i--){
        const emoji= emojiFalls[i];
        const caught=emoji.y + emoji.size>= player.y && 
            emoji.x + emoji.size >= player.x &&
            emoji.x <= player.x + player.width;
        
        if(caught){
            emojiFalls.splice(i,1);
            score++;
        }
        else if(emoji.y > canvas.height){
            emojiFalls.splice(i,1);
            gameOver=true;
        } 
    }
}
let dropInterval;

function startGame(){
    document.getElementById('controls').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('blurOverlay').style.display='none';
    emojiFalls.length=0;
    score=0;
    gameOver=false;
    player.x=(canvas.width/2)-(player.width/2);
    if(dropInterval){
        clearInterval(dropInterval);
    }
    dropInterval=setInterval(dropEmoji, 1000);
    requestAnimationFrame(gameLoop);

}

function gameOverScreen(){
    
    const screen=document.getElementById('gameOverScreen');
    screen.classList.remove('hidden');
    document.getElementById('finalScore').innerText=score;
    document.getElementById('blurOverlay').style.display='block';
}

function restartGame(){
    emojiFalls.length=0;
    score=0;
    gameOver=false;
    player.x=(canvas.width/2)-(player.width/2);
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('blurOverlay').style.display='none';
    if(dropInterval){
        clearInterval(dropInterval);
    }
    dropInterval=setInterval(dropEmoji, 1000);
    requestAnimationFrame(gameLoop);
}
function gameLoop(){
    if(gameOver){
        gameOverScreen();
        return;
    }
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    updatePlayer();
    createPlayer();

    updateEmojis();
    drawEmojis();

    checkCollision();
    displayScore();

    requestAnimationFrame(gameLoop);
}

//gameLoop();