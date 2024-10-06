// Intial canvas setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const collisionsMap = []
for(let i = 0;i < collisions.length;i+=70){
    collisionsMap.push(collisions.slice(i, i + 70));

}

const boundaries = []
const offset = {
    x: -785,
    y: -650
}
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,    
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
});
c.fillStyle = 'white'; 
c.fillRect(0, 0, canvas.width, canvas.height);

// Background image
const image = new Image();
image.src = './img/Pellet Town.png';

// Player image
const playerImage = new Image();
playerImage.src = './img/playerDown.png';

const player = new Sprite({
    position:{
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames : {
        max:4
    }
})

// Background initialization
const backGround = new Sprite({
    position: {
        x: -785,
        y: -650
    },
    image: image  // Assign the image for the background
});

// Key states initialization
const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }  // Fixed duplicate 'w'
};

const testBoundary = new Boundary({
    position:{
        x:400,
        y:400
    }
})

function rectangularCollision({rectangular1,rectangular2}){
    return (
        rectangular1.position.x + rectangular1.width >= rectangular2.position.x && 
        rectangular1.position.x <= rectangular2.position.x + rectangular2.width && 
        rectangular1.position.y <= rectangular2.position.y +rectangular2.height && 
        rectangular1.position.y + rectangular1.height >= rectangular2.position.y
    )
}
movables = [backGround,...boundaries]
// Animation loop
function animate() {
    window.requestAnimationFrame(animate);
    backGround.draw();
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()
    let moving = true

    if (keys.w.pressed &&  lastKey === 'w'){
        for(let i =0;i< boundaries.length;i++){
    const boundary = boundaries[i]
    if(rectangularCollision({
        rectangular1: player,
        rectangular2:{
            ...boundary,position:{
                x:boundary.position.x,
                y:boundary.position.y + 3
            }
        }
    })){
        moving = false
        console.log(moving)
        break;
    }
    }
        if(moving)
        movables.forEach((movable) =>{
         movable.position.y += 3;
        })
    }
     else if (keys.s.pressed &&  lastKey === 's' )
        movables.forEach((movable) =>{
         movable.position.y -= 3;
        })
     else if (keys.a.pressed &&  lastKey === 'a' )
        movables.forEach((movable) =>{
         movable.position.x += 3;
        })
     else if (keys.d.pressed &&  lastKey === 'd' )
        movables.forEach((movable) =>{
         movable.position.x -= 3;
        })
    }
let lastKey  = ''
animate();


// Key press event listeners
window.addEventListener('keydown', (e) => {  // Changed to 'keydown'
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w'
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break;
    }
});

window.addEventListener('keyup', (e) => {  // Changed to 'keyup'
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});
