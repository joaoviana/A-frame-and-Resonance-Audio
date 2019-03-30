//initialise audio context here

// audio context and ra 


// set room props very well

// set 2/3 audio sources 


let occlusionAudioContext;
let occlusionScene;
let occlusionSound;
let occlusionSoundSource;
let occlusionSource;
let audioReady = false;

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

  // Create an audio element. Feed into audio graph.
  occlusionSound = document.createElement("audio");
  occlusionSound.src = "./soundFiles/spoken.wav";
  occlusionSound.crossOrigin = "anonymous";
  
  occlusionSound.load();

  occlusionSoundSource = occlusionAudioContext.createMediaElementSource(occlusionSound);

  // Create a Source, connect desired audio input to it.
  occlusionSource = occlusionScene.createSource();
  // console.log(occlusionSource);
  occlusionSource.setGain(0.9);
  // console.log(occlusionSource);
  occlusionSoundSource.connect(occlusionSource.input);
  audioReady = true;

  console.log('occlusion source: ', occlusionSource);
  console.log('occlusion scene: ', occlusionScene);
  console.log('occlusion audio context: ', occlusionAudioContext);
}



