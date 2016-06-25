var KEY = {
    A_KEY: 65,
    D_KEY: 68,
    Q_KEY: 81,
    SPACE: 32,
};

// MOUSE LISTENER
document.addEventListener('mousemove', function(event) {
    Mouse = {
      x: event.pageX,
      y: event.pageY
    }
    var angle_in_radians = Math.atan2(Mouse.y - player_info.y,
                                      Mouse.x - player_info.x);

    gun_angle = angle_in_radians * (180 / Math.PI);
});

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