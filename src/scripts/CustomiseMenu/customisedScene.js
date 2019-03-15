let customObject = {};
let customAudio, customAudioSource;
let customAudioReady = false;


let customAudioContext;
let customScene;
let customSound;
let customSoundSource;
let customSource;


//handle selections and fallbacks.
function handleCustomisedSelection(customPropsObj) {
  console.log(customPropsObj);

  //handle shape selected, also set default
  if (!customPropsObj.geometry) {
    customPropsObj.geometry = "sphere";
  }

  //handle sound src selected, also set default
  if (!customPropsObj.soundFile) {
    customPropsObj.soundFile = "./soundFiles/trippy.mp3";
  }

  //handle selected room properties, otherwise set those null ones to a default value, like transparent
  if (!customPropsObj.roomProperties.left) {
    customPropsObj.roomProperties.left = "transparent";
  }

  if (!customPropsObj.roomProperties.right) {
    customPropsObj.roomProperties.right = "transparent";
  }

  if (!customPropsObj.roomProperties.front) {
    customPropsObj.roomProperties.front = "transparent";
  }

  if (!customPropsObj.roomProperties.back) {
    customPropsObj.roomProperties.back = "transparent";
  }

  if (!customPropsObj.roomProperties.ceiling) {
    customPropsObj.roomProperties.ceiling = "transparent";
  }

  if (!customPropsObj.roomProperties.floor) {
    customPropsObj.roomProperties.floor = "transparent";
  }

  //handle gain
  if (!customPropsObj.gain) {
    customPropsObj.gain = 1;
  }

  //handle rolloff
  if (!customPropsObj.rolloff) {
    customPropsObj.rolloff = "logarithmic";
  }

  //handle speed of sound
  if (!customPropsObj.speedOfSound) {
    customPropsObj.speedOfSound = 343;
  }

  customObject = customPropsObj;
  //call init audio here with new customPropsObj
  initAudioCustomised(customObject);
}

function initAudioCustomised(customPropsObj) {
  let roomDimensions = {
    width: 20,
    height: 20,
    depth: 20
  };

  let customMaterial = setCustomRoomProperties(customPropsObj.roomProperties);

  //instantiate audio context and RA
  customAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  console.log('AUDIO CONTEXT IN CUSTOMISED SCENE', customAudioContext);
  // Create a (1st-order Ambisonic) ResonanceAudio scene.
  customScene = new ResonanceAudio(customAudioContext);
  // console.log('SCENE IN CUSTOMISED SCENE', scene);

  // Send scene's rendered binaural output to stereo out.
  customScene.output.connect(customAudioContext.destination);

  // Set room acoustics properties.
  customScene.setRoomProperties(roomDimensions, customMaterial);

  // Set speed of sound
  customScene.setSpeedOfSound(customPropsObj.speedOfSound);

  console.log('SCENE AFTER BEING SET NEW PROPS: ', customScene);

  //set up the audio source

  // attach

  // Create an audio element. Feed into audio graph.
  customAudio = document.createElement("audio");
  customAudio.src = "./soundFiles/" + customPropsObj.soundFile;
  customAudio.crossOrigin = "anonymous";
  customAudio.load();
  console.log('custom Audio: ', customAudio);
  customAudioSource = customAudioContext.createMediaElementSource(customAudio);

  // Create a Source, connect desired audio input to it.
  customSource = customScene.createSource();
  console.log('SOURCE BEFORE SET PROPS', customSource);
  customSource.setGain(customPropsObj.gain);
  customSource.setRolloff(customPropsObj.rolloff);
  console.log('SOURCE AFTER PROPS LOL: ', customSource)
  // console.log("source", source);
  customAudioSource.connect(customSource.input);
  // console.log("custom audio source", customAudioSource);
  customAudioReady = true;
}

AFRAME.registerComponent("customise-menu-sound-source", {
  init: function() {
    this.wpVector = new THREE.Vector3();
    var isPlaying = false;
    if(customObject.geomery == 'cube') {
        this.el.setAttribute("geometry", 'primitive: box');
    } else {
        this.el.setAttribute("geometry", 'primitive: ' + customObject.geometry);
    }
    this.el.setAttribute("position", { x: 0, y: 1, z: -3.25 });
    this.el.setAttribute("color", "#FFB6C1");
    this.el.setAttribute("class", "cube");
    this.el.setAttribute("mixin", "cube");

//     class="cube"
//   mixin="cube"
    console.log('sound object', this.el);

    this.el.addEventListener("click", function() {
      console.log('this element: ', this);
      this.setAttribute("color", "pink");
      if (customAudioContext) customAudioContext.resume();

      if (isPlaying == false && customAudio) {
        customAudio.play();
        isPlaying = true;
      } else if (isPlaying == true && customAudio) {
        customAudio.pause();
        isPlaying = false;
      }
    });
  },
  tick: function() {
    if (customSource) {
      customSource.setPosition(
        this.el.object3D.getWorldPosition(this.wpVector).x,
        this.el.object3D.getWorldPosition(this.wpVector).y,
        this.el.object3D.getWorldPosition(this.wpVector).z
      );
    }
  }
});