function getjson(url, callback) {
  let request = new XMLHttpRequest();
  request.addEventListener("load", function(event) {
    callback(JSON.parse(this.responseText));
  }, { once:true });
  request.open("GET", url);
  request.send();
}

var mapcolumns=48
var maprows=20

var tilesize=32

var mapheight
var mapwidth

var friction=0.9
var gravity=1

const Game = function(t_s=32) {
  tilesize=t_s





 
  this.friction     = friction;
  this.gravity      = gravity;


  this.columns      = mapcolumns
  this.rows         = maprows




  this.height       = tilesize * this.rows;
  this.width        = tilesize* this.columns;
  mapheight=this.height
  mapwidth=this.width






 this.player    = new Game.Player();


}

Game.prototype = { constructor : Game ,

update:function(){
 this.player.updatePosition(0.9,1.25);
 this.player.updateAnimation();
 this.player.chgfrm();

}

};







Game.Player = function() {

  this.animations={
    
    i_r:[0],
    j_r:[1],
  m_r:[3,2,3,0],

    i_l:[4],
    j_l:[5],
    m_l:[7,6,7,4]

  }

  getjson("sprites/animations/mario/mario.json",(obj)=>{


    this.animations.i_l=obj.animations.i_l
    this.animations.j_l=obj.animations.j_l
    this.animations.m_l=obj.animations.m_l

    this.animations.i_r=obj.animations.i_r
    this.animations.j_r=obj.animations.j_r
    this.animations.m_r=obj.animations.m_r

    


  })


this.collision=[]

  getjson("sprites/block/collision.json",(obj)=>{
this.collision=obj

  })



this.x=300;
this.y=200;

  this.jumping     = true;
  this.direction_x = -1;
  this.velocity_x  = 0;
  this.velocity_y  = 0;
  this.frame=0;

};
Game.Player.prototype = {


  jump: function() {

if (!this.jumping  && this.velocity_y < 10) {

      this.jumping     = true;
      this.velocity_y -= 20;

    }

  },

  moveLeft: function() {

    this.direction_x = -1;
    this.velocity_x -= 0.55;

  },

  moveRight:function() {

    this.direction_x = 1;
    this.velocity_x += 0.55;

  },
  
it:1,
itm:1,
frms:[],
rt:0,
frmrt:0,

  chgfrm: function(){

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


  },


  chgfs:function(arr,rt=0){
 
    this.frms=arr;
    this.frmrt=rt
this.itm=arr.length

  },

  updateAnimation:function() {
 



    if (this.velocity_y < 0) {
      
        if (this.direction_x < 0) {
          
        this.chgfs(this.animations["j_l"]);
        }
        else {
        this.chgfs(this.animations["j_r"]);
        }

    } else if (this.direction_x < 0) {

        if (this.velocity_x < -0.1) {
        this.chgfs(this.animations["m_l"], 5);
        }
        else{
          this.chgfs(this.animations["i_l"]);
        }

    } else if (this.direction_x > 0) {

        if (this.velocity_x > 0.1){
          this.chgfs(this.animations["m_r"], 5);
        }
        else 
        {
          this.chgfs(this.animations["i_r"]);
        }

    }



  },

  updatePosition:function(friction,gravity) {

    this.x_old = this.x;
    this.y_old = this.y;

    this.velocity_y += gravity;
    this.velocity_x *= friction;

    /* Made it so that velocity cannot exceed velocity_max */
    if (Math.abs(this.velocity_x) > this.velocity_max)
    this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_max)
    this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

    this.x    += this.velocity_x;
    this.y    += this.velocity_y;






// check colliding

//colliding with bounderies of map
    if (this.y<0||this.y>mapheight-tilesize){
      this.y=this.y_old
      this.jumping     = false;
      this.velocity_y=0
    }

    if (this.x<0||this.x>mapwidth-tilesize){
      this.x=this.x_old

      this.velocity_x=0
    }


    //colliding with blocks

for(var i=0;i<=this.collision.length-1;i++){
var sx=this.collision[i][0]*tilesize
var sy=this.collision[i][1]*tilesize


if(     (Math.abs(sx-this.x)<(tilesize-5))     &&     (Math.abs(sy-this.y)<(tilesize-5)  )      ){


  if((this.x>sx-tilesize) && (this.x<(sx+(tilesize)))){
    this.x=this.x_old
    this.velocity_x=0
  }

}

if(     (Math.abs(sx-this.x)<(tilesize-5))     &&     (Math.abs(sy-this.y)<(tilesize-1)  )      ){



if((this.y>sy-tilesize) && (this.y<(sy+tilesize))){
  this.y=this.y_old
  this.velocity_y=0
  this.jumping     = false;
}

}



}




  }
};








