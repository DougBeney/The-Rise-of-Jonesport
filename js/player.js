/*
.----. .-.     .--..-.  .-..----..----.     .---. .-.     .--.   .----. .----.
| {}  }| |    / {} \\ \/ / | {_  | {}  }   /  ___}| |    / {} \ { {__  { {__
| .--' | `--./  /\  \}  {  | {__ | .-. \   \     }| `--./  /\  \.-._} }.-._} }
`-'    `----'`-'  `-'`--'  `----'`-' `-'    `---' `----'`-'  `-'`----' `----'
*/

//Player variables
var playersheet=new Image();
playersheet.src="img/player.png";
var currentsprite=1;
var moving = false, moving_left=false, moving_right=false;
var speed = 4;
var sprite_pos= [
                    {x: 2, y: 1, w: 11, h: 15},
                    {x: 18, y: 1, w: 11, h: 15},
                    {x: 33, y: 1, w: 11, h: 15},
                    {x: 49, y: 1, w: 11, h: 15},
                ];
var player_info = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    h: blocksize*3,
    w: blocksize*2,
    colliding: false,
    jumping: false,
    falling: false,
};
player_collision_bounds = {
    bottom_left: {x: 0, y: 0},
    bottom_right: {x: 0, y: 0},
};

//Gun Variables
var gun=new Image();
var gun_angle=0;
gun.src="/img/shotgun_sheet.png";
var gun_out=false;
var gun_state = 0;
var gun_scale=4;

function drawPlayer(){

    cxt.imageSmoothingEnabled = false;


    cxt.translate(player_info.x, player_info.y);

    RENDER_PLAYER();
    RENDER_GUN();

    cxt.restore();
    if(BOUNDING_BOXES){
        //outline
        cxt.strokeRect(player_info.x,player_info.y,
                        player_info.w,player_info.h);

        //bottom left of player
    }
}

function RENDER_PLAYER(){
    cxt.drawImage(playersheet,
                  sprite_pos[currentsprite].x,sprite_pos[currentsprite].y,
                  sprite_pos[currentsprite].w, sprite_pos[currentsprite].h,
                  0,0, player_info.w, player_info.h);
}

function RENDER_GUN(){
    if(gun_out){
        cxt.translate(player_info.w/2, player_info.h/2+15);
        cxt.rotate(gun_angle * (Math.PI / 180));
        cxt.drawImage(gun,
                gun_state*32,0,32,8,
                -35,-20,
                (gun.width)/2 * gun_scale, gun.height * gun_scale);
    }
}

function playerlogic(){
    // Gun angle stuff
    if (gun_angle < -90 || gun_angle > 90) {
        gun_state = 1;
        if(currentsprite != 2 && currentsprite != 3){
            currentsprite = 2;

        }
    } else {
        gun_state = 0;
        if(currentsprite != 0 && currentsprite != 1){
            currentsprite = 1;
        }
    }
    //move the screen
    if(moving_left){
        var the_player = {
            x: player_info.x,
            y: player_info.y+5,
            w: player_info.w/3,
            h: player_info.h-10
        };
        if(!checkCollisionWithWorld(the_player,true)){
            xoffset-=speed;
        }
    }else if (moving_right){
        var the_player = {
            x: (player_info.x+player_info.w)-(player_info.w/3),
            y: player_info.y+5,
            w: player_info.w/3,
            h: player_info.h-10
        };
        if(!checkCollisionWithWorld(the_player,true)){
            xoffset+=speed;
        }
    }

    var diffX = ((canvas.width / 2)/blocksize)*blocksize - (player_info.w/2)-player_info.x;
    var diffY = ((canvas.height / 2)/blocksize)*blocksize - (player_info.h/2)-player_info.y;

    xoffset-=diffX;
    yoffset-=diffY;

    // center the player
    player_info.x = ((canvas.width / 2)/blocksize)*blocksize - (player_info.w/2);
    player_info.y = ((canvas.height / 2)/blocksize)*blocksize - (player_info.h/2);
}

var animation = setInterval(function(){
    if(moving){
        switch(currentsprite){
            case 0:
                currentsprite = 1;
                break;
            case 1:
                currentsprite = 0;
                break;
            case 2:
                currentsprite = 3;
                break;
            case 3:
                currentsprite = 2;
                break;
            default:
                currentsprite = 0;
                break;
        }
    }

} ,100);




