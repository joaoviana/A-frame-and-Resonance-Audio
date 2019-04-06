//settting up two rooms: t

//main one - sea storm and a cave with a mermaid inside it

let mainAudioContext;
let mainScene;
let lateSource1, lateSource2;
let audioLateReady = false;

//cave scene - with a mermaid inside it

let caveAudioContext;
let caveScene;
let caveSource;
let audioCaveReady = false;
let mermaidCaveSound;
let mermaidCaveSoundSource;


let mermaidSound;
let mermaidSoundSource;
let stormSound;
let stormSoundSource;

// function initSceneAudioContext() {

//     // Set room acoustics properties.
//   let mainAudioDimensions = {
//     width: 50,
//     height: 40,
//     depth: 50
//   };

//   let mainMaterial = setAllRoomProperties("transparent");

//   mainAudioContext = new (window.AudioContext || window.webkitAudioContext)();

//   // Create a (1st-order Ambisonic) ResonanceAudio scene.
//   mainScene = new ResonanceAudio(mainAudioContext);

//   // Send scene's rendered binaural output to stereo out.
//   mainScene.output.connect(mainAudioContext.destination);

//   mainScene.setRoomProperties(mainAudioDimensions, mainMaterial);

//   //mermaid sound source
//   // Create an audio element. Feed into audio graph.
//   mermaidSound = document.createElement("audio");
//   mermaidSound.src = "./soundFiles/mermaidsound.wav";
//   mermaidSound.crossOrigin = "anonymous";
//   mermaidSound.load();
//   mermaidSoundSource = mainAudioContext.createMediaElementSource(mermaidSound);

//   // storm sea sound
//   // Create an audio element. Feed into audio graph.
//   stormSound = document.createElement("audio");
//   stormSound.src = "./soundFiles/stormysea.wav";
//   stormSound.crossOrigin = "anonymous";
//   stormSound.load();
//   stormSoundSource = mainAudioContext.createMediaElementSource(stormSound);

//   // Create a Source, connect desired audio input to it.
//   lateSource1 = mainScene.createSource();
//   lateSource1.setGain(0.5);
//   stormSoundSource.connect(lateSource1.input);

//   lateSource2 = mainScene.createSource();
//   lateSource2.setGain(1);
//   mermaidSoundSource.connect(lateSource2.input);

//   audioLateReady = true;
//   initCaveAudioContext();
// }

function initCaveAudioContext() {
     // Set room acoustics properties.
  let caveAudioDimensions = {
    width: 50,
    height: 20,
    depth: 50
  };


  let caveMaterial = setAllRoomProperties("sheet-rock");

  caveAudioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Create a (1st-order Ambisonic) ResonanceAudio scene.
  caveScene = new ResonanceAudio(caveAudioContext);

  // Send scene's rendered binaural output to stereo out.
  caveScene.output.connect(caveAudioContext.destination);

  caveScene.setRoomProperties(caveAudioDimensions, caveMaterial);

  //mermaid sound source
  // Create an audio element. Feed into audio graph.
  mermaidCaveSound = document.createElement("audio");
  mermaidCaveSound.src = "./soundFiles/mermaidsound.wav";
  mermaidCaveSound.crossOrigin = "anonymous";
  mermaidCaveSound.load();
  mermaidCaveSoundSource = caveAudioContext.createMediaElementSource(mermaidCaveSound);

  caveSource = caveScene.createSource();
  caveSource.setGain(1.3);
  mermaidCaveSoundSource.connect(caveSource.input);

   // storm sea sound
  // Create an audio element. Feed into audio graph.
  stormSound = document.createElement("audio");
  stormSound.src = "./soundFiles/stormysea.wav";
  stormSound.crossOrigin = "anonymous";
  stormSound.load();
  stormSoundSource = caveAudioContext.createMediaElementSource(stormSound);

  // Create a Source, connect desired audio input to it.
  lateSource1 = caveScene.createSource();
  lateSource1.setGain(0.2);
  stormSoundSource.connect(lateSource1.input);

  audioCaveReady = true;
}

AFRAME.registerComponent("storm-sound-source", {
  init: function() {
    this.wpVector = new THREE.Vector3();
    stormSound.setAttribute('loop', true);
    stormSound.play();
  },

  tick: function() {
    if (lateSource1) {
      lateSource1.setPosition(
        this.el.object3D.getWorldPosition(this.wpVector).x,
        this.el.object3D.getWorldPosition(this.wpVector).y,
        this.el.object3D.getWorldPosition(this.wpVector).z
      );
    }
  }
});

AFRAME.registerComponent("mermaid-cave-sound-source", {
    init: function() {
      this.wpVector = new THREE.Vector3();
      mermaidCaveSound.setAttribute('loop', true);
      mermaidCaveSound.play();
    },
  
    tick: function() {
      if (caveSource) {
        caveSource.setPosition(
          this.el.object3D.getWorldPosition(this.wpVector).x,
          this.el.object3D.getWorldPosition(this.wpVector).y,
          this.el.object3D.getWorldPosition(this.wpVector).z
        );
      }
    }
  });
