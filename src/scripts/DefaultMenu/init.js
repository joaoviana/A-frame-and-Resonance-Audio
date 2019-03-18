let defaultAudioContext;
let defaultScene;
let defaultSound;
let defaultSoundSource;
let defaultSource;
let audioReady = false;

function initAudioDefault() {
  // Set room acoustics properties.
  let defaultDimensions = {
    width: 20,
    height: 20,
    depth: 20
  };

  let defaultMaterial = setAllRoomProperties("transparent");

  defaultAudioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Create a (1st-order Ambisonic) ResonanceAudio scene.
  defaultScene = new ResonanceAudio(defaultAudioContext);

  // Send scene's rendered binaural output to stereo out.
  defaultScene.output.connect(defaultAudioContext.destination);

  defaultScene.setRoomProperties(defaultDimensions, defaultMaterial);

  //can add this into another function no?
  // Create an audio element. Feed into audio graph.
  defaultSound = document.createElement("audio");
  defaultSound.src = "./soundFiles/spoken.wav";
  defaultSound.crossOrigin = "anonymous";
  
  defaultSound.load();

  defaultSoundSource = defaultAudioContext.createMediaElementSource(defaultSound);

  // Create a Source, connect desired audio input to it.
  defaultSource = defaultScene.createSource();
  // console.log(defaultSource);
  defaultSource.setGain(0.9);
  // console.log(defaultSource);
  defaultSoundSource.connect(defaultSource.input);
  audioReady = true;

  console.log('default source: ', defaultSource);
  console.log('default scene: ', defaultScene);
  console.log('default audio context: ', defaultAudioContext);
}

// a-frame components relating to the Resonance Audio SDK and audio context
AFRAME.registerComponent("register-room-property", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let dimensions = 20;
      let material = this.getAttribute("src").replace("#", "");
      defaultScene.setRoomProperties(
        setAllRoomDimensions(dimensions),
        setAllRoomProperties(material)
      );
    });
  }
});

AFRAME.registerComponent("default-menu-sound-source", {
  init: function() {
    this.wpVector = new THREE.Vector3();
    var isPlaying = false;
    
    this.el.addEventListener("click", function() {
      
      if (defaultAudioContext) defaultAudioContext.resume();

      if (isPlaying == false && defaultSound) {
        this.setAttribute("color", "green");
        defaultSound.play();
        isPlaying = true;
      } else if (isPlaying == true && defaultSound) {
        this.setAttribute("color", "pink");
        defaultSound.pause();
        isPlaying = false;
      }
    });
  },

  tick: function() {
    if (defaultSource) {
      defaultSource.setPosition(
        this.el.object3D.getWorldPosition(this.wpVector).x,
        this.el.object3D.getWorldPosition(this.wpVector).y,
        this.el.object3D.getWorldPosition(this.wpVector).z
      );
    }
  }
});