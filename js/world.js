var xoffset=0, yoffset=0;
var render_distance = 100;
var world_width = 20;
var world_height= 100;
var world_check_timeout = 300;
var spawn_height = 10;
var tileset = new Image();
tileset.src = "/img/terrain.png";

var skyimg = new Image();
skyimg.src = "/img/sky.png";

var block = {
    EMPTY: 0,
    GRASS_TOP: 1,
    GRASS: 2,
    DIRT: 3,
    STONE: 4,
};

var tilemap = [
    {EMPTY: true},        //EMPTY block (skips in generation)
    {x: 12, y: 1, s: 10}, //GRASS_TOP
    {x: 12, y: 12, s: 10}, //GRASS
    {x: 12, y: 23, s: 10}, //DIRT
    {x: 12, y: 34, s: 10}, //STONE

];

var blocksize = 32;

var worldarray = [];
var visable_worldarray = [];

var odds_of_grass = 2;

function generate_world(){

    for(var bx = -Math.floor(world_width/2); bx < Math.floor(world_width/2); bx++){
        for(var by = 0; by <= world_height; by++){
            var block_type;
            switch(by){
                case 0:
                    if(Math.floor(Math.random()*odds_of_grass) == 0){
                        block_type = block.GRASS_TOP;
                    }else{
                        block_type = block.EMPTY;
                    }
                    if(bx == -Math.floor(world_width/2) || bx == Math.floor(world_width/2)-1){
                        block_type = block.STONE;
                    }
                    if(bx == Math.floor(world_width/2)-4){
                        block_type = block.DIRT;
                    }
                    break;
                case 1:
                    block_type = block.GRASS;
                    break;
                default:
                    block_type = block.DIRT;
                    break;
            }
            if(block_type != block.EMPTY){
                worldarray.push({index: block_type, x: bx, y: by});
                if(block_type == block.STONE){
                    worldarray.push({index: block_type, x: bx, y: by-1});
                }
            }
        }
    }
    yoffset= Math.floor(-spawn_height*blocksize);
}

setInterval(function(){

    visable_worldarray = [];
    //Adding "collidable" tiles
    for (var i in worldarray){
        if(worldarray[i].x*blocksize-xoffset >= -render_distance
        && worldarray[i].x*blocksize-xoffset <= canvas.width+render_distance
        && worldarray[i].y*blocksize-yoffset >= -render_distance
        && worldarray[i].y*blocksize-yoffset <= canvas.height+render_distance){
            visable_worldarray.push(worldarray[i]);
        }
    }

}, world_check_timeout);

function drawWorld(){
    cxt.fillText("Blocks on screen: " + visable_worldarray.length, 20, 20);
    for (var i in visable_worldarray){
        drawTile(visable_worldarray[i].index,visable_worldarray[i].x,visable_worldarray[i].y);
    }
}


function drawTile(index, x,y){
    if(index != 666){
        cxt.imageSmoothingEnabled = false;
        cxt.drawImage(
            tileset,
            tilemap[index].x, tilemap[index].y,
            tilemap[index].s, tilemap[index].s,
            Math.round(x*blocksize-xoffset), Math.round(y*blocksize-yoffset),
            blocksize, blocksize
        );
    }else{
        cxt.drawImage(skyimg, Math.floor(x*blocksize), Math.floor(y*blocksize), blocksize, blocksize);
    }
}