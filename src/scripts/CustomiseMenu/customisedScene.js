let customObject = {};
let customAudio, customAudioSource;
let customAudioReady = false;

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
  console.log("object in init audio", customPropsObj);
  let roomDimensions = {
    width: 20,
    height: 20,
    depth: 20
  };

  let customMaterial = setCustomRoomProperties(customPropsObj.roomProperties);

  //instantiate audio context and RA
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  console.log('AUDIO CONTEXT IN CUSTOMISED SCENE', audioContext);
  // Create a (1st-order Ambisonic) ResonanceAudio scene.
  scene = new ResonanceAudio(audioContext);
  console.log('SCENE IN CUSTOMISED SCENE', scene);

  // Set room acoustics properties.
  scene.setRoomProperties(roomDimensions, customMaterial);
  console.log("room props: ", scene);

  // Set speed of sound
  scene.setSpeedOfSound(customPropsObj.speedOfSound);
  console.log("speed of sound", customPropsObj.speedOfSound);

  console.log('SCENE AFTER BEING SET NEW PROPS: ', scene);

  // Send scene's rendered binaural output to stereo out.
  scene.output.connect(audioContext.destination);

  //set up the audio source

  // attach

  // Create an audio element. Feed into audio graph.
  customAudio = document.createElement("audio");
  customAudio.src = "./soundFiles/" + customPropsObj.soundFile;
  customAudio.crossOrigin = "anonymous";
  customAudio.load();
  console.log(customAudio);
  customAudioSource = audioContext.createMediaElementSource(customAudio);

  // Create a Source, connect desired audio input to it.
  source = scene.createSource();
  console.log('SOURCE BEFORE SET PROPS', source);
  source.setGain(customPropsObj.gain);
  source.setRolloff(customPropsObj.rolloff);
  console.log('SOURCE AFTER PROPS LOL: ', source)
  // console.log("source", source);
  customAudioSource.connect(source.input);
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
      this.setAttribute("color", "pink");
      if (audioContext) audioContext.resume();

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
    if (source) {
      source.setPosition(
        this.el.object3D.getWorldPosition(this.wpVector).x,
        this.el.object3D.getWorldPosition(this.wpVector).y,
        this.el.object3D.getWorldPosition(this.wpVector).z
      );
    }
  }
});

// init: function() {

//     this.el.addEventListener("click", function() {
//       this.setAttribute("color", "pink");
//       if (audioContext) audioContext.resume();

//       if (isPlaying == false && defaultSound) {
//         defaultSound.play();
//         isPlaying = true;
//       } else if (isPlaying == true && defaultSound) {
//         defaultSound.pause();
//         isPlaying = false;
//       }
//     });
//   },

//   tick: function() {
//     if (source) {
//       source.setPosition(
//         this.el.object3D.getWorldPosition(this.wpVector).x,
//         this.el.object3D.getWorldPosition(this.wpVector).y,
//         this.el.object3D.getWorldPosition(this.wpVector).z
//       );
//     }

//   <a-sphere
//   id="sound-obj"
//   default-menu-sound-source
//   class="cube"
//   mixin="cube"
//   position="0 1 -3.25"
//   radius="1"
//   material="color:#FFB6C1"
// ></a-sphere>
