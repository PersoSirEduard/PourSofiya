function skyScene() {
  this.clouds = [];
  let maxClouds = 4;
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
    amplitude: [6, 6],
    waveLength: [12, 120]
  }));

  this.update = function() {
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
