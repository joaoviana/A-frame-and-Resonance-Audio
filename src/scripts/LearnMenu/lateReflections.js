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
  console.log('sound: ', mermaidCaveSound)
  console.log('sound source: ', mermaidCaveSoundSource)
  //mermaid sound source late reflections: [3.4713995456695557, 3.628162384033203, 3.4498541355133057, 10.031046867370605, 16.801977157592773, 16.65700912475586, 9.47618293762207, 5.426042079925537, 1.875927209854126]

  caveSource = caveScene.createSource();
  caveSource.setGain(1.3);
  mermaidCaveSoundSource.connect(caveSource.input);
  console.log('ra source: ', caveSource)

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

  AFRAME.registerComponent("late-reflection-1", {
    init: function() {
      let sceneEl = document.querySelector("a-scene");
      this.torus = sceneEl.querySelector("#lr1");
      this.i = 0.1;
    },
  
    tick: function() {
      this.torus.setAttribute('radius', 1 + this.i);
      this.i += 0.1;
    }
  });

//approximately: 25/latereflections durations 
//get individual velocity values and display them
// if radius is bigger than 25, start all over again x
    //mermaid sound source late reflections: [3.4713995456695557, 3.628162384033203, 3.4498541355133057, 10.031046867370605, 16.801977157592773, 16.65700912475586, 9.47618293762207, 5.426042079925537, 1.875927209854126]