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
  "assets/textures/cloud2.png",
  "assets/textures/package.png",
  "assets/textures/parachute.png",
  "assets/sounds/music.mp3",
  "assets/textures/star.png"
];

var currentScene = 0;
var sceneObj;
var playingScene = false;
var goToNextScene = false;

let mouseX = 0;
let mouseY = 0;

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

window.addEventListener('click', onClickEvent);

function onClickEvent(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

for (let a = 0; a < assets.length; a++) { ///Load all assets
  PIXI.Loader.shared.add(assets[a]);
}
PIXI.Loader.shared.load(setup); //When finish loading --> go to setup()

function setup() {
  app.stage.filters = []
  playScene(); //Play first scene
  app.ticker.add(delta => { //Tick update
    updateEvent(delta);
  });
}

function updateEvent(delta) {
  for (let f = 0; f < app.stage.filters.length; f++) { //Update animation for the filters
    let filter = app.stage.filters[f];
    filter.time += 0.05;
    }
  updateScene(); //Update function for specific scene
  if (sceneObj.finished) { //Wait for next scene
    goToNextScene = true;
    playScene(); //Play the next scene
  }
}

function playScene() {
  if (playingScene == false) {
    app.stage.childen = [];
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
    playScene();
  }
}

function updateScene() {
  if (playingScene) {
    sceneObj.update();
    playingScene = true;
  }
}
