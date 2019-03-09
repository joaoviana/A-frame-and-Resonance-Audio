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
  // console.log(scene);
  
  // console.log(scene);
  // Send scene's rendered binaural output to stereo out.
  defaultScene.output.connect(defaultAudioContext.destination);

  defaultScene.setRoomProperties(defaultDimensions, defaultMaterial);

  

  //can add this into another function no?
  // Create an audio element. Feed into audio graph.
  defaultSound = document.createElement("audio");
  defaultSound.src = "./soundFiles/funky2.mp3";
  defaultSound.crossOrigin = "anonymous";
  
  defaultSound.load();

  defaultSoundSource = defaultAudioContext.createMediaElementSource(defaultSound);

  // Create a Source, connect desired audio input to it.
  defaultSource = defaultScene.createSource();
  console.log(defaultSource);
  defaultSource.setGain(0.9);
  console.log(defaultSource);
  defaultSoundSource.connect(defaultSource.input);
  audioReady = true;
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
      this.setAttribute("color", "pink");
      if (defaultAudioContext) defaultAudioContext.resume();

      if (isPlaying == false && defaultSound) {
        defaultSound.play();
        isPlaying = true;
      } else if (isPlaying == true && defaultSound) {
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

// setAmbisonicOrder(order)

// /**
//  * Set the listener's position and orientation using a Three.js Matrix4 object.
//  * @param {Object} matrix
//  * The Three.js Matrix4 object representing the listener's world transform.
//  */
// ResonanceAudio.prototype.setListenerFromMatrix = function(matrix) {
//   this._listener.setFromMatrix(matrix);

//   // Update the rest of the scene using new listener position.
//   this.setListenerPosition(this._listener.position[0],
//     this._listener.position[1], this._listener.position[2]);
// };

// .setSpeedOfSound = function(speedOfSound) {

//for tomorrow: make a scene that will take those room property parameters.
//consider a menu before the room properties one that you are able to set the speed of sound, ambisonic order, and maybe add more room wall props, maybe onnnnnnnnnn the menu before choosing the each wall one.
//idk, think about it
