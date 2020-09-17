

class Content {

  constructor(name, content) {

    this.name =name;
    this.content=content;
    
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    
    this.infodisplay = false;

    //this.position = createVector(width - 300, height - 350);

    this.x = random(0, 650);
    this.y = random(0, 700);
    
    // Dimensions
    this.w = 250;
    this.h = 350;
    
    this.colr = random(200, 250);
    this.colg = random(200, 250);
    this.colb = random(200, 250);
    //this.button = new Button(this.name,this.content, this.x, this.y, this.w, this.h);
    //this.button.show();
    this.knob = new Knob(this.x, this.y, this.w, this.h);
    this.Button = new Button(this.x, this.y, this.w, this.h);
    //Knob.show(this.x, this.y, this.w, this.h);
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
    
  }

  show() {
    this.knob.show(this.x, this.y, this.w, this.h);
    this.Button.show(this.x, this.y, this.w, this.h);
    fill(0);
    
    //text(this.content, this.x+10, this.y+50);
    //console.log(name);
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(this.colr);
    }
    rect(this.x, this.y, this.w, this.h);
    //this.button.show(this.x, this.y, this.w, this.h);
    fill(0);
    textAlign(CENTER);
    text(this.name, this.x+this.w/2, this.y+50);
    textAlign(LEFT);
    text(this.content, this.x+20, this.y+50+20);
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
    this.Button.pressed(this.x, this.y, this.w, this.h);
    
  }
  connect(){
    //this.knob.line();
  }
  released() {
    // Quit dragging
    this.dragging = false;
  }
}

class Button {
    
    constructor (){
      

    }
    
    show (x,y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        //console.log(name, content);
        noStroke();
        fill(255, 255, 255);
        rect(this.x+w, this.y, this.w/10, this.h);
        fill(0);
        text("<",this.x+w+(this.w/20), this.y+(this.h/2));
    }

    pressed(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
      // Did I click on the rectangle?
      if (mouseX > this.x+w && mouseX < this.x + this.w+20 && mouseY > this.y && mouseY < this.y + this.h) {
        
        var element = document.querySelector(".container");
        var textx = document.getElementById("1");
        console.log(element);
        console.log(textx);
        element.style.display = "block";
        textx.style.display = "block";
      }

    }

    
    /*addPicture(){
        var d = dist(mouseX, mouseY, this.x/2, this.y/2);
        if (d < this.x/2 && d < this.y/2){
            this.col = color(255,0, 255);
            //img = loadImage("https:assets/1.jpg");
        }  
    }*/
}

class Knob{

  constructor(posX, posY, w, h){
    this.x = posX;
    this.y = posY;
    this.w = w;
    this.h = h;
  }

  show(posX, posY, w, h){
      
      this.x = posX;
      this.y = posY;
      ellipse(this.x, this.y+this.h/2, 10, 10);
      ellipse(this.x +this.w/2, this.y, 10, 10);
      ellipse(this.x +this.w, this.y+this.h/2, 10, 10);
      ellipse(this.x +this.w/2, this.y + this.h, 10, 10);
  }

  /*line(){
    if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
      line
    }
  }*/
}