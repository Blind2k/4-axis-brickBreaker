
ctx.beginPath();
// rect(): the first two values specify the coordinates of the top left corner of the rectangle on the canvas, while the second two specify the width and height of the rectangle.
ctx.rect(40, 40, 40, 40); 
ctx.fillStyle = "#000"
ctx.fill()
ctx.closePath()

ctx.beginPath();
ctx.arc(300, 300, 20, 0, Math.PI*2, false);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"
ctx.stroke();
ctx.closePath();
/*arc() method. It takes six parameters:

1+2) x and y coordinates of the arc's center
3) arc radius
4+5) start angle and end angle (what angle to start and finish drawing the circle, in radians)
6) direction of drawing (false for clockwise, the default, or true for anti-clockwise.) This last parameter is optional.*/

var y = canvas.height-30;
//bottom - 30

requestAnimationFrame(draw)           //browser rendercontrol
// var gameInterval = setInterval(draw, 10); //      clearInterval(gameInterval)=> human framerate cotntrol control