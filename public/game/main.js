

  const socket = io('/');





























var chatcode=0





let name =""


if (localStorage.getItem("name")==null){

name = prompt("What is Your name?")
localStorage.setItem("name" , `${name}`)

}

    name = localStorage.getItem("name")

    console.log(name + " Joined")

   

    socket.emit('connected', name);

var others={}

socket.on('toothers', (obj)=>{
  others[obj.id]=[obj.name,obj.frm,obj.x,obj.y]
  
              });

              socket.on('distoothers', (ids)=>{
delete others[ids]
                            });


window.addEventListener("load", function(event) {

  "use strict";

var tilesize=32;




  function getimage(url, callback) {
    let image = new Image();
    image.addEventListener("load", function(event) {
      callback(image);
    }, { once:true });
    image.src = url;
  }
  
  function getjson(url, callback) {
    let request = new XMLHttpRequest();
    request.addEventListener("load", function(event) {
      callback(JSON.parse(this.responseText));
    }, { once:true });
    request.open("GET", url);
    request.send();
  
  
  }
  









  var animatedobjects=[]

      /////////////////
    //// CLASSES ////
  /////////////////

var animator=function(url,x=2,y=2,initfrm=0,rate){
  getjson(url,(obj)=>{

    if(rate==undefined){
      this.frmrt=obj.rate
    }
else{
  this.frmrt=rate
}




this.obj=obj
this.x=x
this.y=y
this.name=obj.name

this.frame=initfrm;
this.it=initfrm

this.frms=[]
this.itm=obj.sprites_url.length

this.sprites=[]
for (let i=0;i<=obj.sprites_url.length-1;i++){
  getimage(obj.location+obj.sprites_url[i], (img) => {
    this.frms[i]=i
    this.sprites[i]=img

  })
}
  })

}


animator.prototype = { 
  
  constructor : animator,


 
  rt:0,


  chgfrm: function(){

    if(this.frmrt!=-1){

   

    if(this.rt>=this.frmrt){
this.rt-=this.frmrt;

if(this.it>=this.itm){
this.it=0
this.frame=this.frms[this.it]

}else{
  this.frame=this.frms[this.it]
  this.it++
}
    }

this.rt+=2.5;


}

  }



  };





      /////////////////
    //// variables////
  /////////////////

var blocks=[]

var b_p=[]

var marioobj={

}

marioobj.sprites=[]


      /////////////////
    //// Assets loader ////
  /////////////////

function loadedassets(callback) {

  //create animated objects....

animatedobjects.push( new animator("sprites/animations/copy/"+"init.json",4,13,4))

animatedobjects.push( new animator("sprites/animations/copy/"+"init.json",6,13,0))




  //get blocks
  getjson("sprites/block/blocks.json",(obj)=>{



    for(let i = 0; i <= obj.length-1; i++){

      getimage("sprites/block/"+obj[i], (img) => {


      blocks[i]=img
      
    })



  }

  })

//get blocks position to setup
  getjson("sprites/block/positions.json",(obj)=>{
b_p=obj

  })

 
  //get mario
  getjson("sprites/animations/mario/mario.json",(obj)=>{

   

marioobj.name= obj.name
marioobj.animations= obj.animations



          for(let i = 0; i <= obj.sprites_url.length-1; i++){


              getimage(obj.location+obj.sprites_url[i], (img) => {
              marioobj.sprites[i]=img

              if(i==obj.sprites_url.length-1){
                callback()
              }
            })



          }






  })


  
  
}









      ///////////////////
    //// FUNCTIONS ////
  ///////////////////

  var keyDownUp = function(event) {

    controller.keyDownUp(event.type, event.keyCode);

  };

  var resize = function(event) {

    // display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
    
    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, display.camerah / display.cameraw);
  
    
    display.render();

    var rectangle = display.context.canvas.getBoundingClientRect();


  };



  ///
  ///
  /// render functionssssssssssssssssssssssssssssssssssss
  ///
  //
  ///
  //

  var render = function() {


   //drawing background
   display.setcolor("rgb(93,148,251)")

//drawing world
   
for(var i=0;i<=b_p.length-1;i++){



  //every block of same type
  for(var j=0;j<=b_p[i].length-1;j++){
    
 var x=  b_p[i][j][0] * tilesize
 var y=  b_p[i][j][1] * tilesize



 display.drawit(blocks[i],x,y)

if(chatcode==1){
  engine.stop()
}



  }


}



//draw animated objects
for(let i=0;i<=animatedobjects.length-1;i++){

  display.drawit(animatedobjects[i].sprites[animatedobjects[i].frame],animatedobjects[i].x*tilesize,animatedobjects[i].y*tilesize)
      



animatedobjects[i]. chgfrm();

}
 





//drawing other players

var otherslist=Object.values(others)

for (var i=0;i<=otherslist.length-1;i++){
  display.drawit(marioobj.sprites[otherslist[i][1]],otherslist[i][2],otherslist[i][3])
      
  display.drawtext(otherslist[i][0],otherslist[i][2] +4,otherslist[i][3]-6)

}


//drawing player

    display.drawit(marioobj.sprites[game.player.frame],game.player.x,game.player.y)
    
    
    socket.emit('toserver',{"frm":game.player.frame,"x":game.player.x,"y":game.player.y} );



   
    display.drawtext("YOU",game.player.x +4,game.player.y-6)

    display.movecamera(tilesize,game.player.x,game.player.y)
    // display.drawit(marioobj.sprites[game.player.frame],4*tilesize,10*tilesize)

 
    display.render();




  };

  var update = function() {

    if (controller.left.active ) { 
    game.player.moveLeft ();       
                    }
    if (controller.right.active) { game.player.moveRight();  
                                 }
    if (controller.up.active   ) { game.player.jump();      controller.up.active = false; }


    // if (controller.pause.active ) { 
    //   console.log("Engine Halted")

    //   engine.stop()    
    //                   }

    game.update();



  };

      /////////////////
    //// OBJECTS ////
  /////////////////



  var controller     = new Controller();
  var display        = new Display(document.querySelector("canvas"),32,16);
  var game           = new Game(tilesize);


  var engine         = new Engine(1000/30, render, update);





      ////////////////////
    //// INITIALIZE ////
  ////////////////////


  display.buffer.canvas.height = game.height;
  display.buffer.canvas.width  = game.width;

  display.buffer.imageSmoothingEnabled = false;



 loadedassets(()=>{


    resize();
    engine.start();
     
    
  })


  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup"  , keyDownUp);
  window.addEventListener("resize" , resize);

});










//////////
////////// chat featurezzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
//////////
/////////

const inpform = document.getElementById('inpform')
const inpbox = document.getElementById('inpbox')
const chatbox = document.getElementById('chatbox')



// function msgsubmit(){

  
// }


inpform.addEventListener("submit", e => {

  e.preventDefault()

  var inptxt = inpbox.value || ""

  if (inptxt!=""){

if(inptxt=="halt"){
  console.log("Engine Halted")
  inpbox.value=""
  chatbox.scrollTop = chatbox.scrollHeight;

chatcode=1

appendMsg(`GAME HALTED`,"usrinp")

  // engine.stop()    

}else{

  socket.emit("sendmsg", {"name":name,"msg":inptxt})

  appendMsg(`<span class="usr">YOU</span> : ${inptxt}`,"usrinp")

  inpbox.value=""
  chatbox.scrollTop = chatbox.scrollHeight;


}


  }

  
})


socket.on("othermsg", res => {
  appendMsg(`<span class="others">${res.name}</span> :  ${res.msg}`,"otherres")

  chatbox.scrollTop = chatbox.scrollHeight;
})



function appendMsg(chat,cname){
  const chatEl = document.createElement("div")
  chatEl.className="chatl"
  chatEl.className=cname
  chatEl.innerHTML= chat
  chatbox.append(chatEl)
}