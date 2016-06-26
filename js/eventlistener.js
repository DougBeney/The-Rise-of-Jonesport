var KEY = {
    A_KEY: 65,
    D_KEY: 68,
    Q_KEY: 81,
    SPACE: 32,
};

var leftdown=false, rightdown=false;

// MOUSE LISTENER
document.addEventListener('mousemove', function(event) {
    Mouse = {
      x: event.pageX,
      y: event.pageY
    }
    var angle_in_radians = Math.atan2(Mouse.y - player_info.y,
                                      Mouse.x - player_info.x);

    gun_angle = angle_in_radians * (180 / Math.PI);

    var mx = Math.floor((event.pageX+xoffset)/blocksize);
    var my = Math.floor((event.pageY+yoffset)/blocksize);

    if(leftdown){
        for(var i in visable_worldarray){
            if(visable_worldarray[i].x == mx && visable_worldarray[i].y == my){
                visable_worldarray.splice(i,1);
                for(var j in worldarray){
                    if(worldarray[j].x == mx && worldarray[j].y == my){
                        worldarray.splice(j, 1);
                    }
                }
                break;
            }
        }
    }
    if(rightdown){
        worldarray.push({index: block.STONE, x: mx, y: my});
        visable_worldarray.push({index: block.STONE, x: mx, y: my});
    }
});

document.addEventListener('mousedown', function(e){
    buttonHandler(e);
});

document.addEventListener('mouseup', function(e){
    if(e.button == 0){
        leftdown = false;
    }
    if(e.button == 2){
        rightdown = false;
    }
});

function buttonHandler(e){
    var mx = Math.floor((e.pageX+xoffset)/blocksize);
    var my = Math.floor((e.pageY+yoffset)/blocksize);

    if(e.button == 0){ //left click


        leftdown=true;
        for(var i in visable_worldarray){
            if(visable_worldarray[i].x == mx && visable_worldarray[i].y == my){

                visable_worldarray.splice(i,1);
                for(var j in worldarray){
                    if(worldarray[j].x == mx && worldarray[j].y == my){
                        worldarray.splice(j,1);
                    }
                }
                break;
            }
        }

    }else if (e.button == 2){ //right click
        worldarray.push({index: block.STONE, x: mx, y: my});
        rightdown=true;
    }
}

// KEYBOARD LISTENER
document.addEventListener('keydown', function(e){
    switch(e.keyCode){
        case KEY.A_KEY:
            moving = true;
            moving_left = true;
            moving_right = false;
            break;
        case KEY.D_KEY:
            moving = true;
            moving_left = false;
            moving_right = true;
            break;
        case KEY.Q_KEY:
            gun_out = !gun_out;
            break;
        case KEY.SPACE:
            jump();
    }
});

document.addEventListener('keyup', function(e){
    switch(e.keyCode){
        case 65:
            if(moving){moving = false;}
            moving_left = false;
            break;
        case 68:
            if(moving){moving = false;}
            moving_right = false;
            break;
    }
});