// Creating variables
var canvas = document.getElementsByTagName("canvas")[0];
var geometry = [new THREE.BoxGeometry( 10, 6, 1 ), new THREE.BoxGeometry( 1, 6, 10 )];
var egeometry = new THREE.BoxGeometry( 2, 2, 2 );
var sphere = new THREE.SphereGeometry( 0.5, 10, 10 );
var material = new THREE.MeshPhongMaterial();
var bmaterial = new THREE.MeshPhongMaterial({color: 'blue'});
var ematerial = new THREE.MeshPhongMaterial({color: 'red'});

var nw = 200, ne = 30;
var wall = [], t = [];

var enemy = [];
var bullets = [], dx=[], dz=[];

for (let i=0; i<nw; ++i){
    t[i] = Math.floor(Math.random()*2)
    wall[i] = new THREE.Mesh( geometry[t[i]], material );
    wall[i].position.set(Math.random()*500-250, 0, Math.random()*500-250);
    scene.add(wall[i]);
}

for (let i=0; i<ne; ++i){
    enemy[i] = new THREE.Mesh(egeometry, ematerial);
    enemy[i].position.set(Math.random()*500-250, 0, Math.random()*500 - 250);
    scene.add(enemy[i]);
}

var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
var light3 = new THREE.PointLight( );
light.position.set(2000, 200, 2000);
light2.position.set(-1000, 200, -2000);
light3.position.set(0, 200, 0);
scene.add( light );
scene.add( light2 );
scene.add( light3 );

var cx = 0, cy = 0, cz = 0, dy=0;
var alpha=-Math.PI/2, beta=0;
updateCamera();
function updateCamera(){
    camera.position.set(cx, cy, cz);
    camera.lookAt(new THREE.Vector3(Math.cos(beta)*Math.cos(alpha) + cx, Math.sin(beta) + cy, Math.cos(beta)*Math.sin(alpha) + cz));
}
var vel = 0.5;
var onwall;
function update() {
    let oldy = cy;
    cy += dy;
    dy -= 0.01;
    let oldx = cx;
    let oldz = cz;
    if (cy<0) {cy=0;}
    if (isKeyPressed[87]){
        cx += Math.cos(alpha)*vel;
        cz += Math.sin(alpha)*vel;
    }
    if (isKeyPressed[83]){
        cx -= Math.cos(alpha)*vel;
        cz -= Math.sin(alpha)*vel;
    }
    if (isKeyPressed[68]){
        cx += Math.cos(alpha+Math.PI/2)*vel;
        cz += Math.sin(alpha+Math.PI/2)*vel;
    }
    if (isKeyPressed[65]){
        cx += Math.cos(alpha-Math.PI/2)*vel;
        cz += Math.sin(alpha-Math.PI/2)*vel;
    }
    onwall = false;
    for (let i=0; i<ne; ++i){
        enemy[i].rotation.y = Math.atan2(cz - enemy[i].position.z, cx - enemy[i].position.x);
        enemy[i].position.x += Math.cos(enemy[i].rotation._y)*vel/2;
        enemy[i].position.z += Math.sin(enemy[i].rotation._y)*vel/2;
        for (let j=0; j<nw; ++j){
            if (t[j] == 0){
                if(areColliding(enemy[i].position.x-1, enemy[i].position.z-1, 2, 2, wall[j].position.x-5, wall[j].position.z-0.5, 10, 1)){
                    enemy[i].position.x -= Math.cos(enemy[i].rotation._y)*vel/2;
                    enemy[i].position.z -= Math.sin(enemy[i].rotation._y)*vel/2;
                    break;
                }
            }else{
                if(areColliding(enemy[i].position.x-1, enemy[i].position.z-1, 2, 2, wall[j].position.x-0.5, wall[j].position.z-5, 1, 10)){
                    enemy[i].position.x -= Math.cos(enemy[i].rotation._y)*vel/2;
                    enemy[i].position.z -= Math.sin(enemy[i].rotation._y)*vel/2;
                    break;
                }
            }
        }
    }
    for (let i=0; i<nw; ++i){
        if (t[i] == 0){
            if(areColliding(cx-1, cz-1, 2, 2, wall[i].position.x-5, wall[i].position.z-0.5, 10, 1) && cy <= wall[i].position.y+4){
                cx = oldx;
                cy = oldy;
                dy = 0;
                cz = oldz;
                onwall = true;
                break;
            }
        }else{
            if(areColliding(cx-1, cz-1, 2, 2, wall[i].position.x-0.5, wall[i].position.z-5, 1, 10) && cy <= wall[i].position.y+4){
                cx = oldx;
                cy = oldy;
                dy = 0;
                cz = oldz;
                onwall = true;
                break;
            }
        }
    }
    for (let i=0; i<bullets.length; ++i){
        bullets[i].position.x += dx[i];
        bullets[i].position.z += dz[i];
        if (bullets[i].position.x > 200 || bullets[i].position.x < -200 || bullets[i].position.z > 200 || bullets[i].position.z < -200){
            scene.remove(bullets[i]);
            bullets[i] = bullets[bullets.length-1];
            dx[i] = dx[bullets.length-1]
            dz[i] = dz[bullets.length-1]
            bullets.pop();
            dx.pop();
            dz.pop();
            continue;
        }
        let rem=false;
        for (let j=0; j<nw; ++j){
            if (t[j] == 0){
                if(areColliding(bullets[i].position.x-0.25, bullets[i].position.z-0.25, 0.5, 0.5, wall[j].position.x-5, wall[j].position.z-0.5, 10, 1)){
                    scene.remove(bullets[i]);
                    bullets[i] = bullets[bullets.length-1];
                    dx[i] = dx[bullets.length-1]
                    dz[i] = dz[bullets.length-1]
                    bullets.pop();
                    dx.pop();
                    dz.pop();
                    rem = true;
                    break;
                }
            }else{
                if(areColliding(bullets[i].position.x-0.25, bullets[i].position.z-0.25, 0.5, 0.5, wall[j].position.x-0.5, wall[j].position.z-5, 1, 10)){
                    scene.remove(bullets[i]);
                    bullets[i] = bullets[bullets.length-1];
                    dx[i] = dx[bullets.length-1]
                    dz[i] = dz[bullets.length-1]
                    bullets.pop();
                    dx.pop();
                    dz.pop();
                    rem = true;
                    break;
                }
            }
        }
        if (rem) continue;
        for (let j=0; j<ne; ++j){
            if(areColliding(bullets[i].position.x-0.5, bullets[i].position.z-0.5, 1, 1, enemy[j].position.x-1, enemy[j].position.z-1, 2, 2)){
                scene.remove(bullets[i]);
                bullets[i] = bullets[bullets.length-1];
                dx[i] = dx[bullets.length-1]
                dz[i] = dz[bullets.length-1]
                bullets.pop();
                dx.pop();
                dz.pop();
                scene.remove(enemy[j]);
                enemy[j].position.z = 200000;
                break;
            }
        }
    }
    updateCamera();
}

function keyup(key) {
	// Show the pressed keycode in the console
    if (key == 27){
        document.exitPointerLock();
    }
    if ((cy==0 || onwall) && key == 32){
        dy = 0.5;
    }
	console.log("Pressed", key);
}
function mouseup() {
    if (document.pointerLockElement !== canvas){
        canvas.requestPointerLock();
    }else{
        let b = new THREE.Mesh( sphere, bmaterial );
        b.position.set(cx, cy, cz);
        scene.add(b);
        bullets.push(b);
        dx.push(Math.cos(alpha)*4);
        dz.push(Math.sin(alpha)*4);
    }
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
function mouseMove(mx, my){
    alpha += mx/100;
    beta -= my/100;
    if (beta >= Math.PI/2) beta = Math.PI/2;
    if (beta <= -Math.PI/2) beta = -Math.PI/2;
}
