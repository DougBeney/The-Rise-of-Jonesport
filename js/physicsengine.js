/*
██████╗ ██╗  ██╗██╗   ██╗███████╗██╗ ██████╗███████╗
██╔══██╗██║  ██║╚██╗ ██╔╝██╔════╝██║██╔════╝██╔════╝
██████╔╝███████║ ╚████╔╝ ███████╗██║██║     ███████╗
██╔═══╝ ██╔══██║  ╚██╔╝  ╚════██║██║██║     ╚════██║
██║     ██║  ██║   ██║   ███████║██║╚██████╗███████║
╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝ ╚═════╝╚══════╝
--Note: xoffset and yoffset ultimately control movement
---xoffset and yoffset are a part of world.js
*/

var speedy = 1.02;

function initPhysics(){

}

function physicsLoop(){
    player_collision_bounds = {
        bottom_x: Math.floor((player_info.x+blocksize+xoffset)/blocksize),
        bottom_y: Math.floor((player_info.y+(blocksize*3)+yoffset)/blocksize),
    };

    if(!checkCollisionWithWorld({x: player_collision_bounds.bottom_x,
                                 y: player_collision_bounds.bottom_y})){
        yoffset+=speed*speedy;
    }
}

function checkCollisionWithWorld(p1){
    for(var i in visable_worldarray){
        if(p1.x == visable_worldarray[i].x && p1.y == visable_worldarray[i].y &&
        visable_worldarray[i].index != block.GRASS_TOP){
            return true;
        }else if(i == visable_worldarray.length-1){
            return false;
        }
    }
}

function jump(){
    if(!player_info.jumping){

    }
}