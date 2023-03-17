var n=28, m=31;
endlessCanvas = true;
var grid=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1],[1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1],[1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,0,0,0,1,1,0,1],[1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],[1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],[1,0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],[1,0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],[1,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1],[1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],[1,0,1,1,1,0,1,1,0,1,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],[1,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,1,0,0,0,0,1],[1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],[1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],[1,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,1,0,0,0,0,1],[1,0,1,1,1,0,1,1,0,1,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],[1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],[1,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1],[1,0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],[1,0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],[1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],[1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],[1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,0,0,0,1,1,0,1],[1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1],[1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
var food=[];
var score = 0;
for (let i=0; i<n; ++i){
    food[i] = [];
    for (let j=0; j<m; ++j){
        food[i][j] = 1-grid[i][j];
        if (i>=7 && i<=20 && j>=9 && j<=19) food[i][j]=0;
    }
}
function drawGrid(){
    for (let i=0; i<n; ++i){
        for (let j=0; j<m; ++j){
            if (grid[i][j]) context.fillStyle = 'blue';
            else context.fillStyle = 'black';
            context.fillRect(20*i, 20*j, 20, 20);
            if (food[i][j]) {
                context.fillStyle="yellow";
                context.beginPath();
                context.arc(20*i+10, 20*j+10, 5, 0, 2*Math.PI);
                context.fill();
            }
        }
    }
}
 

class Bot{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
    ai(x, y){}
    update(playerX, playerY){
        let dir = this.ai(playerX, playerY);
        let newx=this.x, newy=this.y
        if (dir==0) --newx;
        if (dir==1) ++newx;
        if (dir==2) --newy;
        if (dir==3) ++newy;
        if (newx>=0 && newx<n && newy>=0 && newy<m && !grid[newx][newy]){
            this.x = newx;
            this.y = newy;
        }
    }
    draw(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x*20+10, this.y*20+10, 10, 0, 2*Math.PI);
        context.fill();
    }
}
class Ghost extends Bot{
    constructor(x, y, color, dx, dy){
        super(x, y, color);
        this.dx = dx;
        this.dy = dy;
    }
    ai(x, y){
        //this.x, this.y
        //x, y
        let dist = []
        for (let i=0; i<n; ++i){
            dist[i] = [];
            for (let j=0; j<m; ++j){
                dist[i][j] = -2;
            }
        }
        dist[x][y] = 0;
        let k=0
        let cells = [{x: x, y: y}], cells2 = [];
        for (k=0; cells.length>0; ++k){
            for (let cell of cells){
                if (cell.x > 0 && dist[cell.x-1][cell.y]==-2 && grid[cell.x-1][cell.y]==0){
                    dist[cell.x-1][cell.y] = k+1;
                    cells2.push({x:cell.x-1, y:cell.y});
                }
                if (cell.x < n-1 && dist[cell.x+1][cell.y]==-2 && grid[cell.x+1][cell.y]==0){
                    dist[cell.x+1][cell.y] = k+1;
                    cells2.push({x:cell.x+1, y:cell.y});
                }
                if (cell.y > 0 && dist[cell.x][cell.y-1]==-2 && grid[cell.x][cell.y-1]==0){
                    dist[cell.x][cell.y-1] = k+1;
                    cells2.push({x:cell.x, y:cell.y-1});
                }
                if (cell.y < m-1 && dist[cell.x][cell.y+1]==-2 && grid[cell.x][cell.y+1]==0){
                    dist[cell.x][cell.y+1] = k+1;
                    cells2.push({x:cell.x, y:cell.y+1});
                }
            }
            cells = cells2;
            cells2 = [];
        }
        let d = dist[this.x][this.y];
        if (this.x>0 && dist[this.x-1][this.y] == d-1) return 0;
        if (this.x<n-1 && dist[this.x+1][this.y] == d-1) return 1;
        if (this.y>0 && dist[this.x][this.y-1] == d-1) return 2;
        if (this.y<m-1 && dist[this.x][this.y+1] == d-1) return 3;
    }
};
 
class Player extends Bot{
    ai(x, y){
        if (isKeyPressed[key_left]) return 0;
        if (isKeyPressed[key_right]) return 1;
        if (isKeyPressed[key_up]) return 2;
        if (isKeyPressed[key_down]) return 3;
    }
    update(x, y){
        super.update(x, y);
        if (food[this.x][this.y]){
            ++score;
            food[this.x][this.y] = 0;
        }
        for (let g of ghost){
            if (g.x == player.x && g.y==player.y){
                console.log("Game Over", score);
                score = 0;
            }
        }
    }
};
 
var ghost = [new Ghost(14, 14, "red", -4, 0), new Ghost(14, 14, "pink", 4, 0), new Ghost(14, 14, "purple", 0, -4), new Ghost(14, 14, "green", 0, 4)];
var player = new Player(14, 23, "white");
var t=0;
function update() {
    t++;
    if (t%10==0){
        player.update();
        for (let g of ghost){
            var targetX=player.x, targetY=player.y;
            let dist = Math.abs(targetX-g.x) + Math.abs(targetY-g.y);
            if (targetX+g.dx < n && targetX+g.dx >= 0 && !grid[targetX+g.dx][targetY] && dist>4){
                targetX = targetX + g.dx;
            }
            if (targetY+g.dy < m && targetY+g.dy >= 0 && !grid[targetX][targetY+g.dy] && dist>4){
                targetY = targetY + g.dy;
            }
            g.update(targetX, targetY);
        }
    }
}
function draw() {
    drawGrid();
    for (let g of ghost) g.draw();
    player.draw();
};
function keyup(key) {
   
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};
function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};