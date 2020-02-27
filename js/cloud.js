function Cloud() {
  this.speed = 0.8;
  this.toDestroy = false;
  var rdmType = Math.random();
  if (rdmType < 0.5) {
    this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["assets/textures/cloud1.png"].texture);
  } else {
    this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["assets/textures/cloud2.png"].texture);
  }
  let r;
  if (window.innerHeight > window.innerWidth) {
    r = (window.innerWidth * window.innerHeight)*0.0008;
  } else {
    r = (window.innerWidth * window.innerHeight)*0.0003;
  }
  this.sprite.width = r + 100*Math.random();
  this.sprite.height = r*0.7 + 100*Math.random();
  var rdmHeight = Math.random() * 0.4 * window.innerHeight;
  this.sprite.position.y = rdmHeight;
  this.sprite.position.x = -this.sprite.width;
  this.speed = this.speed*Math.random() + 0.2;
  app.stage.addChild(this.sprite);

  this.update = function() {
    if (this.sprite.position.x >= window.innerWidth + this.sprite.width) {
      this.toDestroy = true
    } else {
      this.sprite.position.x += this.speed;
    }
  }
}
