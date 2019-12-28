
const Display = function(canvas,cw=16,ch=9) {

  this.buffer  = document.createElement("canvas").getContext("2d"),
  this.context = canvas.getContext("2d");

this.drawtext=function(text,xp,yp){

  
  this.buffer.font = "14px Arial";
  this.buffer.fillStyle = "black"

  // this.buffer.strokeStyle = "white";
  // this.buffer.strokeText(text,xp,yp);


  this.buffer.fillText(text,xp,yp); 
}

this.setcolor=function(clr){
  this.buffer.fillStyle = clr
  this.buffer.rect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
  this.buffer.fill();
};


  this.drawit= function(image,xp,yp) {

    this.buffer.drawImage(image, xp, yp);

  
  };

  //camera setup
  this.camerax=0;
  this.cameray=0;
  this.cameraw=cw;
  this.camerah=ch;

this.ts=32

  this.movecamera= function(ts,xp,yp) {
    this.ts=ts

    this.camerax=((xp-8*ts))
this.cameray=((yp-8*ts))

this.cameraw=cw*ts
this.camerah= ch*ts
  };


  this.resize = function(width, height, height_width_ratio) {

    if (height / width > height_width_ratio) {

      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width  = width;

    } else {

      this.context.canvas.height = height;
      this.context.canvas.width  = height / height_width_ratio;

    }

    this.context.imageSmoothingEnabled = false;

  };

};

Display.prototype = {

  constructor : Display,

  render:function() { 

    // this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); 
    
    //set color to blue
    // this.context.fillStyle = "rgb(93,148,251)"

    //color to body background
        this.context.fillStyle = "rgb(32,40,48)"
    this.context.rect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fill();
    
    this.context.drawImage(this.buffer.canvas, this.camerax, this.cameray, this.cameraw, this.camerah,  0,  0, this.context.canvas.width, this.context.canvas.height); 
  
  },

};
