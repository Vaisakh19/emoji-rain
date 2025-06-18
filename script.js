const canvas= document.getElementById('gameCanvas');
const ctx=canvas.getContext('2d');// ctx used to draw on the canvas

let keys={
    left:false,
    right:false
}

const player={
    width:100,
    height:20,
    speed:5,
    color:'white',
    x:0,
    y:0
}
player.x=(canvas.width/2)-(player.width/2);
player.y=(canvas.height-30);

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
    ctx.fillStyle=player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function updatePlayer(){
    if(keys.left ){
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


function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(){
    clearCanvas();
    updatePlayer();
    createPlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();