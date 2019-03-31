let occlusionAudioContext;
let occlusionScene;
let humanSound;
let humanSoundSource;
let human2Sound;
let human2SoundSource;
let sineSound;
let sineSoundSource;
let occlusionSource1, occlusionSource2, occlusionSource3;
let audioReadyOcclusion = false;

function initOcclusionAudioContext() {
  // Set room acoustics properties.
  let occlusionDimensions = {
    width: 50,
    height: 30,
    depth: 50
  };

  let occlusionMaterial = setAllRoomProperties("transparent");

  occlusionAudioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Create a (1st-order Ambisonic) ResonanceAudio scene.
  occlusionScene = new ResonanceAudio(occlusionAudioContext);

  // Send scene's rendered binaural output to stereo out.
  occlusionScene.output.connect(occlusionAudioContext.destination);

  occlusionScene.setRoomProperties(occlusionDimensions, occlusionMaterial);

  //adding 3 audio sources: two with the same sound file, one with just white noise. 

  //human sound 1
  // Create an audio element. Feed into audio graph.
  humanSound = document.createElement("audio");
  humanSound.src = "./soundFiles/whisper.wav";
  humanSound.crossOrigin = "anonymous";
  humanSound.load();
  humanSoundSource = occlusionAudioContext.createMediaElementSource(humanSound);

  //human sound 2
  // Create an audio element. Feed into audio graph.
  human2Sound = document.createElement("audio");
  human2Sound.src = "./soundFiles/whisper.wav";
  human2Sound.crossOrigin = "anonymous";
  human2Sound.load();
  human2SoundSource = occlusionAudioContext.createMediaElementSource(human2Sound);

  //sine sound 
  // Create an audio element. Feed into audio graph.
  sineSound = document.createElement("audio");
  sineSound.src = "./soundFiles/sine.wav";
  sineSound.crossOrigin = "anonymous";
  sineSound.load();
  sineSoundSource = occlusionAudioContext.createMediaElementSource(sineSound);
  // Create a Source, connect desired audio input to it.
  occlusionSource1 = occlusionScene.createSource();
  occlusionSource1.setGain(0.7);
  humanSoundSource.connect(occlusionSource1.input);

  occlusionSource2 = occlusionScene.createSource();
  occlusionSource2.setGain(0.7);
  human2SoundSource.connect(occlusionSource2.input);
  
  occlusionSource3 = occlusionScene.createSource();
  occlusionSource3.setGain(1);
  sineSoundSource.connect(occlusionSource3.input);

  audioReadyOcclusion = true;

  // console.log('occlusion source: ', occlusionSource);
  console.log('occlusion scene: ', occlusionScene);
  console.log('occlusion audio context: ', occlusionAudioContext);
}

AFRAME.registerComponent("occlusion-sound-source-1", {
  init: function() {
    this.wpVector = new THREE.Vector3();
    var isPlaying = false;
    // if (occlusionAudioContext) occlusionAudioContext.resume();
    humanSound.setAttribute('loop', true);
    humanSound.play();
    
    // this.el.addEventListener("click", function() {
      
      // if (isPlaying == false && humanSound) {
      //   this.setAttribute("color", "green");
      //   isPlaying = true;
      // } else if (isPlaying == true && humanSound) {
      //   this.setAttribute("color", "pink");
      //   humanSound.pause();
      //   isPlaying = false;
      // }
    // });
  },

  tick: function() {
    if (occlusionSource1) {
      occlusionSource1.setPosition(
        this.el.object3D.getWorldPosition(this.wpVector).x,
        this.el.object3D.getWorldPosition(this.wpVector).y,
        this.el.object3D.getWorldPosition(this.wpVector).z
      );
    }
  }
});

AFRAME.registerComponent("occlusion-sound-source-2", {
  init: function() {
    this.wpVector = new THREE.Vector3();
    var isPlaying = false;
    // if (occlusionAudioContext) occlusionAudioContext.resume();
    human2Sound.setAttribute('loop', true);
    human2Sound.play();
    
    // this.el.addEventListener("click", function() {
      

      // if (isPlaying == false && human2Sound) {
      //   this.setAttribute("color", "green");
      //   isPlaying = true;
      // } else if (isPlaying == true && human2Sound) {
      //   this.setAttribute("color", "pink");
      //   human2Sound.pause();
      //   isPlaying = false;
      // }
    // });
  },

  tick: function() {
    if (occlusionSource2) {
      occlusionSource2.setPosition(
        this.el.object3D.getWorldPosition(this.wpVector).x,
        this.el.object3D.getWorldPosition(this.wpVector).y,
        this.el.object3D.getWorldPosition(this.wpVector).z
      );
    }
  }
});

AFRAME.registerComponent("occlusion-sound-source-3", {
  init: function() {
    this.wpVector = new THREE.Vector3();
    var isPlaying = false;
    
    // if (occlusionAudioContext) occlusionAudioContext.resume();
    sineSound.setAttribute('loop', true);
    sineSound.play();
    // this.el.addEventListener("click", function() {
      

    //   if (isPlaying == false && sineSound) {
    //     this.setAttribute("color", "green");
    //     isPlaying = true;
    //   } else if (isPlaying == true && sineSound) {
    //     this.setAttribute("color", "pink");
    //     sineSound.pause();
    //     isPlaying = false;
    //   }
    // });
  },

  tick: function() {
    if (occlusionSource3) {
      occlusionSource3.setPosition(
        this.el.object3D.getWorldPosition(this.wpVector).x,
        this.el.object3D.getWorldPosition(this.wpVector).y,
        this.el.object3D.getWorldPosition(this.wpVector).z
      );
    }
  }
});