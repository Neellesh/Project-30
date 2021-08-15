class Stone {
   constructor (x,y,width,height){
      var options = {
      restitution: 0.5,
      density: 0.01 };

      this.r = 30;
      this.width = width;
      this.height = height;
      this.body = Bodies.circle(x, y, this.r, options);
      World.add(world, this.body); 
   }

   display(){

      var pos = this.body.position

      push();
      ellipseMode(RADIUS);
      ellipse(pos.x,pos.y,this.r)
      pop();
   }
}