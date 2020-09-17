var zoom = 1.00;
var zMin = 0.05;
var zMax = 9.00;
var sensativity = 0.005;

var oldMouseX;
var oldMouseY;

var bx =0.0;
var by = 0.0;

var counter=0;

let textbox = [];


function setup() {
    var size = document.querySelector('#myContainer');
    var sizeX = size.style.offsetWidth;
    var sizeY = size.style.offsetHeight;
    var sketchCanvas = createCanvas(windowWidth,windowHeight);
    sketchCanvas.style= ("z-index: 0");
    console.log(sketchCanvas);
    sketchCanvas.parent("myContainer");
    
    //img = image(/assets/holbein)

    //socket = io.connect("http://localhost:5000");
   }

function draw() {
    background(230, 230, 230);
    //scale(zoom);
    //translate(bx, by);
    for(let i =0; i < textbox.length; i++){
        textbox[i].update();
        textbox[i].over();
        textbox[i].show();
    };
}

function addContent(name, content){
    let t = new Content(name, content);
    //console.log(content);
    textbox.push(t);

}

function mouseWheel(event) {
    //zoom += sensativity * event.delta;
    //zoom = constrain(zoom, zMin, zMax);
    //uncomment to block page scrolling
    //return false;
    //textbox.released()
}

function mousePressed(){
    for(var i =0; i<textbox.length; i++){
        textbox[i].pressed();
        textbox[i].Button.pressed();
}
    //oldMouseX = mouseX;
    //oldMouseY = mouseY;
}

function mouseReleased() {
  //Quit dragging
  for(var i =0; i<textbox.length; i++){
  textbox[i].released();
  }
}

/*function mouseDragged() {
    newMouseX = mouseX;
    newMouseY = mouseY;
    bx -= oldMouseX - newMouseX;
    by -= oldMouseY - newMouseY;
    oldMouseX = newMouseX;
    oldMouseY = newMouseY;
}*/
