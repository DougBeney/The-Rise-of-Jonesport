var canvas, cxt, requestAnimationFrame;

var Mouse = {
  x: 0,
  y: 0
}

window.onload = function() {

  /*Begin Initializing*/
  function init() {
    document.oncontextmenu =new Function("return false;");
    requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    canvas = document.createElement("canvas");
    var container = document.createElement("div");
    canvas.width = 1080;
    canvas.height = 500;
    cxt = canvas.getContext("2d");
    container.appendChild(canvas);
    document.body.appendChild(container);
    document.getElementsByTagName("div")[0].className = "container";

    //Add stuff here!
    generate_world();
    initPhysics();

  }
  init();

  function loop() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    logic();
    draw();
    requestAnimationFrame(loop);
  }
  loop();
  /*End Initialization*/

  function draw() {
    cxt.save();

    //Insert Draw Code
    drawWorld();
    drawPlayer();

    cxt.restore();
  }

  function logic() {

    //Insert Logic
    playerlogic();
    physicsLoop();

    //resize screen
    canvas.width = $('.container').innerWidth();
    canvas.height = $('.container').innerHeight();
  }

}