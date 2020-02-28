function fallingPackage() {
  this.xSpeed = 0;
  this.ySpeed = 1;
  this.crateInWater = false;
  let r = (window.innerWidth * window.innerHeight)*0.0008;
  this.spriteCrate = new PIXI.Sprite(PIXI.Loader.shared.resources["assets/textures/package.png"].texture);
  this.spriteParachute = new PIXI.Sprite(PIXI.Loader.shared.resources["assets/textures/parachute.png"].texture);
  this.spriteCrate.width = r*0.5;
  this.spriteCrate.height = r*0.35;
  this.spriteCrate.position.x = (window.innerWidth - this.spriteCrate.width)/2;
  this.spriteCrate.position.y = -this.spriteCrate.height;
  this.spriteParachute.width = r*0.5;
  this.spriteParachute.height = r*0.5;
  this.spriteParachute.position.x = (window.innerWidth - this.spriteParachute.width)/2;
  this.spriteParachute.position.y = this.spriteCrate.position.y - this.spriteParachute.height/1.5;
  this.text = new PIXI.Text('Click sur moi',{fontFamily : 'Source Sans Pro', fontSize: 24, fill : 0xff1010, align : 'center'});
  this.text.position.x = (window.innerWidth - this.text.width)/2;
  this.text.position.y = -50;
  app.stage.addChild(this.spriteParachute);
  app.stage.addChild(this.spriteCrate);
  app.stage.addChild(this.text);

  let noise = new Perlin();
  let t = 0;

  this.update = function() {
    if (this.spriteCrate.position.y < 0.6 * window.innerHeight - this.spriteCrate.height/1.7 && this.crateInWater==false) {
      this.spriteCrate.position.y += this.ySpeed;
    } else {
      this.crateInWater = true;
      this.spriteCrate.position.y = 0.6 * window.innerHeight - this.spriteCrate.height/1.7 + this.spriteCrate.height*0.2*noise.getValue(t);
      this.text.position.y = this.spriteCrate.position.y - this.text.height;
    }
    this.spriteCrate.position.x += this.xSpeed;
    this.spriteParachute.position.y += this.ySpeed;
    this.spriteParachute.position.x += this.xSpeed;
    t+=0.01;
  }
}
