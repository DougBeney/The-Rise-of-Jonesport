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

var velocity_y = 1.02;
var left_should_fall = false;
var right_should_fall = false;
var bottomofblock = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
};
function initPhysics(){

}


function physicsLoop(){
    bottomofblock = {x: player_info.x+5, y: player_info.y+(player_info.h/2)-1,
                     w: player_info.w-10, h: player_info.h/2+speed*velocity_y};
    //ground collision
    if(!checkCollisionWithWorld(bottomofblock) && !player_info.jumping){
        yoffset+=Math.round(speed*velocity_y);
        velocity_y+=.05;
        player_info.falling = true;
    }else{
        velocity_y = 1.02;
        player_info.falling = false;
    }
}

function checkCollisionWithWorld(p1, custom){
    var touchingsomething = false;
        for(var i in visable_worldarray){
            var ip = {
                x: p1.x,
                y: p1.y,
                w: p1.w,
                h: p1.h,
            };
            var ib = {
                x: Math.round(blocksize*visable_worldarray[i].x-xoffset),
                y: Math.round(blocksize*visable_worldarray[i].y-yoffset),
                w: blocksize,
                h: blocksize,
            };


            if(ip.x+ip.w >= ib.x &&
               ip.x <= ib.x+ib.w &&
               ip.y <= ib.y+ib.h &&
               ip.y + ip.h >= ib.y){
                if(visable_worldarray[i].index != block.GRASS_TOP){
                    touchingsomething = true;
                }
            }else if(i == visable_worldarray.length-1){
                if(!touchingsomething){
                    touchingsomething = false;
                }
            }
        }

    return touchingsomething;
}

function jump(){

    if(!player_info.jumping && !player_info.falling){

        var i = 0;
        var delay = 0.5;
        var extraheight = 10;

        var the_player_left = {
            x: player_info.x+20,
            y: player_info.y-blocksize+extraheight,
            w: player_info.w/3,
            h: player_info.h-10
        };
        var the_player_right = {
            x: (player_info.x+player_info.w)-(player_info.w/3)-20,
            y: player_info.y-blocksize+extraheight,
            w: player_info.w/3,
            h: player_info.h-10
        };
        if(!checkCollisionWithWorld(the_player_left, true) && !checkCollisionWithWorld(the_player_right, true)){
            player_info.jumping = true;

            var jumploop = setInterval(function(){

                yoffset-=1;

                if(i == blocksize+extraheight){
                    player_info.jumping = false;
                    clearInterval(jumploop);
                }

                i++;
            },delay);
        }

    }
}