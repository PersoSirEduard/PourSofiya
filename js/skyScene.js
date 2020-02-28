function skyScene() {
  let maxClouds = 5;
  this.clouds = [];
  let sky = new PIXI.Sprite(PIXI.Loader.shared.resources["assets/textures/sky.jpg"].texture);
  sky.height = window.innerHeight;
  sky.width = window.innerWidth;
  app.stage.addChild(sky);
  app.stage.filters = [];
  app.stage.filters.push(new PIXI.filters.GodrayFilter({
    lacunarity: 0.6
  }));
  app.stage.filters.push(new PIXI.filters.ReflectionFilter({
    mirror: true,
    boundary: 0.60,
    amplitude: [8, 8],
    waveLength: [20, 120]
  }));
  this.package = new fallingPackage();
  this.finished = false;
  this.startAnim = false;
  this.particleContainer = new PIXI.ParticleContainer();

  for (let i = 0; i < 255; ++i) { //Generate stars in the background
   let starSprite = PIXI.Sprite.from(PIXI.Loader.shared.resources["assets/textures/star.png"].texture); //Load star texture
   let starSize = Math.random() * 5; //Random size for star
   starSprite.width = starSize;
   starSprite.height = starSize;
   starSprite.position = new PIXI.Point(Math.random() * window.innerWidth, Math.random() * window.innerHeight + window.innerHeight/1.65); //Random position for star on screen
   this.particleContainer.addChild(starSprite); //Add star to particle container
 }
 app.stage.addChildAt(this.particleContainer, 1);

 var sentences = [
   "Pour Sofiya",
   "test 1 jfdkasjfklasd",
   "test 2 asjfklasd",
   "test 3 uitueiowut490",
   "attente infinie"
];
var sentencesWaitTime = [
  20,
  7,
  7,
  7,
  Infinity
];

  let t = 0;
  let tmax = 200;

  this.update = function() {
    if (this.startAnim) {
      for (let i = 0; i < this.particleContainer.children.length; ++i) { //Update for each star
        let particle = this.particleContainer.children[i];
        particle.position.y -= 0.8; //Update position of star
        particle.position.x += 0.2;
        if (particle.position.y < 0) {
          particle.position.x = Math.random() * window.innerWidth - 30;
          particle.position.y = window.innerHeight * 0.61;
        }
      }
    }
    if (getDistance(this.package.spriteCrate.position.x + this.package.spriteCrate.width/2, this.package.spriteCrate.position.y - this.package.spriteCrate.height/2, mouseX, mouseY) < this.package.spriteCrate.width && this.startAnim == false) {
      mouseX = 0;
      mouseY = 0;
      this.startAnim = true;
      PIXI.Loader.shared.resources["assets/sounds/music.mp3"].data.volume = 0.7;
      PIXI.Loader.shared.resources["assets/sounds/music.mp3"].data.play(); //Play music
      app.stage.filters.push(new PIXI.filters.AdjustmentFilter({
        gamma: 0.6,
        saturation: 1,
        brightness: 0.2,
        contrast: 1.5
      }));
      sky.tint = 0x151570;
      this.package.text.visible = false;
      this.writer = new typewriter(sentences, 100, sentencesWaitTime);
    }
    this.package.update();
    let rdm = Math.random();
    if (rdm < 0.1 && this.clouds.length < maxClouds) {
      this.clouds.push(new Cloud());
    }
    for (let c = 0; c < this.clouds.length; c++) {
      this.clouds[c].update();
      if (this.clouds[c].toDestroy) {
        this.clouds[c].sprite.destroy();
        this.clouds.splice(c, 1);
      }
    }
  }
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}
