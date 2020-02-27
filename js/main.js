/*
  ================================
   -- Dsl Sofiya --
   Par Eduard Anton (AKA NextLight)
   Créé le 25 février 2020
  ================================
*/

var assets = [ //INSERT ALL ASSETS INCLUDING IMAGES AND SOUNDS HERE
  "assets/textures/sky.jpg",
  "assets/textures/cloud1.png",
  "assets/textures/cloud2.png"
];

var currentScene = 0;
var sceneObj;
var playingScene = false;
var goToNextScene = false;

const app = new PIXI.Application({ //New PIXI engine container
  width: window.innerWidth,
  height: window.innerHeight,
  autoResize: true,
  antialias: true
});

document.body.appendChild(app.view); //Add canvas to html body
window.addEventListener('resize', resize); //Window resize event

function resize() { //Resize Event
  app.renderer.resize(window.innerWidth, window.innerHeight);
}

for (let a = 0; a < assets.length; a++) { ///Load all assets
  PIXI.Loader.shared.add(assets[a]);
}
PIXI.Loader.shared.load(setup); //When finish loading --> go to setup()

function setup() {
  app.stage.filters = []
  playScene();
  app.ticker.add(delta => { //Tick update
    updateEvent(delta);
  });
}

function updateEvent(delta) {
  for (let f = 0; f < app.stage.filters.length; f++) {
    let filter = app.stage.filters[f];
      filter.time += 0.05;
    }
  updateScene();
}

function playScene() {
  if (playingScene == false) {
    switch (currentScene) {
      case 0:
        sceneObj = new skyScene();
      break;
    }
    playingScene = true;
  } else if (goToNextScene) {
    goToNextScene = false;
    playingScene = false;
    currentScene++;
  }
}

function updateScene() {
  if (playingScene) {
    switch (currentScene) {
      case 0:
        sceneObj.update();
      break;
    }
    playingScene = true;
  }
}
