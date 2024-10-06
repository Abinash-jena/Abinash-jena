const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");
let score = 0;
let lives = 5;  


   // Bird object with initial properties
let bird = {
    startX: 100, 
    startY: 300,
    width: 80,
    height: 80,
};

   // Target object with initial properties
let tree = {
    startX: 600,
    startY: 100,
    width: 80,
    height: 80,
};

  // bullet for hit the targate  
let bullet = {
    startX: 100, 
    startY: 300,
    width: 80,
    height: 80,
};

   // Load images 
let birdImg = new Image();
birdImg.src = "bird.png"; 
birdImg.onload = function() {
    ctx.drawImage(birdImg, bird.startX, bird.startY, bird.height, bird.width);
};
let targetImg = new Image();
targetImg.src = "tree2.png"; 
targetImg.onload = function() {
    ctx.drawImage(targetImg, tree.startX, tree.startY, tree.width, tree.height);
};


   // create bullete for shoot
let bulletImg = new Image();
bulletImg.src = "bird.png";

   // set interval time of the tree
let intervalId = window.setInterval(function(){
     moveTree();
  }, 1000);


   // move the tree
function moveTree() {
    tree.startX = randomIntFromInterval(canvas.width/2, canvas.width - tree.width);
    tree.startY = randomIntFromInterval(0, canvas.height- tree.height);
    ctx.clearRect(400, 0, canvas.width, canvas.height);
    ctx.drawImage(targetImg, tree.startX, tree.startY, tree.width, tree.height);
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random()*(max - min + 1) + min);
}

     // stop the tree by press space bar and start by enter key
window.onkeydown = function(event){
    if(event.keyCode === 32) {      // space
        event.preventDefault();
        // console.log("Space");
        fireBird();
    }
    else if(event.keyCode === 13) {     // enter
        if (intervalId != null) return;
        intervalId = window.setInterval(function(){
            resetBird();
        }, 1000);
    }
};

       // fire the bird
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fireBird() {
    clearInterval(intervalId);
    intervalId = null;
        // drawline(bird.startX, bird.startY, 800, bird.startY);
        // drawline(bird.startX, bird.startY+bird.height, 800, bird.startY+bird.height);
        
        
        // throw image & create image 3
  
    for(var i = bird.startX + 100; i < canvas.width; i+=10){
    
        bullet.startX = i;
        bullet.startY = bird.startY;
        ctx.drawImage(bulletImg, bullet.startX, bullet.startY, bullet.height, bullet.width);
        // delay
        await sleep(5);

        // if hit then score +       
        // Let's say coordinates of Bird : (x1, y1) (x2,y2)
        // coordinates of Tree : (a,b) (c,d)
                                          
        let isHit = hit(bullet, tree);
        if (isHit) {
            console.log("there is hit")
            // Display score function call
            drawScore();
            // update game score
            score += 1;
            console.log("score++");
            // reset??
            break;
        }
            // clear ract
        ctx.clearRect(i, bird.startY, bird.width, bird.height);
        if (i >= canvas.width - bullet.width) {  // Bird missed the tree
            loseLife();  // - a life when the bird misses
            resetBird();
            break;
        }
        

    }
}

   // draw score bord and clearrect clear 0-100 x position 60-20 y position
function drawScore() {
    ctx.clearRect(0,60,100,20);
    ctx.font = "20px Arial";
    ctx.fillStyle = "red"; 
    ctx.fillText("Score: " + score, 0, 80); 
}


   // function for bird hits the tree

function hit(bird, tree){
    let x1 = bird.startX;
    let y1 = bird.startY;
    let x2 = bird.startX + bird.width;
    let y2 = bird.startY + bird.height;

    let a = tree.startX;
    let b = tree.startY;
    let c = tree.startX + tree.width;
    let d = tree.startY + tree.height;  

    // check if y is aligned
    let yAligned = false;
    if (b > y1 && b < y2){
        yAligned = true;
    }
    else if (d > y1 && d < y2 ){
        yAligned = true;
    }
    else if (b > y1 && d < y2){
        yAligned = true;
    }

    if (yAligned != true) {
        return false;
    }
    // y is aligned (Both Bird and Tree are in same Y.. there will be a hit when x comes closer)
    if (x2 >= a){
       return true;
    }
    return false;
}
     // reset the bird after hit
function resetBird() {
    moveTree();
    // console.log("Enter");

    // reset bullet(bird)  
    ctx.clearRect(bird.startX +100 , bird.startY, bird.height, bird.width);
}

    // draw the line
function drawline(x1, y1, x2, y2) { 
   ctx.beginPath();
   ctx.moveTo(x1, y1);
   ctx.lineTo(x2, y2);
   ctx.stroke();
}

    // Draw the lives on the canvas and slear rect 
function drawLives() {
    ctx.clearRect(0, 30, 100, 20);
    ctx.font = "20px Arial";
    ctx.fillStyle = "red"; 
    ctx.fillText("Lives: " + lives, 0, 50); 
}

     // Function to lose a life
function loseLife() {
    lives--;
    drawLives();
    
    if (lives === 0) {
        gameOver();
    }
}

     // Handle game over
function gameOver() {
    alert("Game Over!");
    // Reset the game or display final score
    score = 0;
    lives = 5;  // Reset lives
    drawScore(); // again draw score
    drawLives(); // again draw lives
    resetBird(); 
}

