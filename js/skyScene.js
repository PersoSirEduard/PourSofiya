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
   let starSize = Math.random() * 10; //Random size for star
   starSprite.width = starSize;
   starSprite.height = starSize;
   starSprite.position = new PIXI.Point(Math.random() * window.innerWidth, Math.random() * window.innerHeight + window.innerHeight/1.65); //Random position for star on screen
   this.particleContainer.addChild(starSprite); //Add star to particle container
 }
 app.stage.addChildAt(this.particleContainer, 1);

var sentences = [
   "Pour Sofiya,",
   "Je ne sais pas par où commencer.",
   "Je nous ai causé tant de problèmes",
   "Sache que cela n'a jamais été mon intention.",
   "Je suis désolé de t'avoir empoisonné les jours et nuits ces derniers mois.",
   "Je suis désolé de t'avoir insultée.",
   "Je suis désolé de m'avoir commporté comme un idiot du début jusqu'à aujourd'hui.",
   "Je suis desolé que mon affection pour toi est si égoiste.",
   "Il y a une infinité de choses pour lesquelles je ne pourrais jamais me faire pardonner...",
   "Si j'avais la chance de revenir en arrière pour changer la situation, je le ferais.",
   "J'aurais voulu avoir la chance de te faire sourire et rire,",
   "mais au lieu, je t'ai repoussée et peut être même fait peur.",
   "C'est mon triste regret en ta présence.",
   "Mh. C'est difficile de m'exprimer...",
   "En fait, il y a juste a savoir que tu es une femme magnifique et que...",
   "Je suis désolé."
];
var sentencesWaitTime = [
  20,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
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
      PIXI.Loader.shared.resources["assets/sounds/music.mp3"].data.volume = 0.95;
      PIXI.Loader.shared.resources["assets/sounds/music.mp3"].data.play(); //Play music
      app.stage.filters.push(new PIXI.filters.AdjustmentFilter({
        gamma: 0.65,
        saturation: 1.2,
        brightness: 0.25,
        contrast: 1.5
      }));
      sky.tint = 0x151570;
      this.package.text.visible = false;
      this.writer = new typewriter(sentences, 90, sentencesWaitTime);
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
