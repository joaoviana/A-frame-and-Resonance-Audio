// //Room properties: 

// //look up set functions, create a 3rd order ambisonic ??


// /*
// 'transparent':
//   [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000],
//   'acoustic-ceiling-tiles':
//   [0.672, 0.675, 0.700, 0.660, 0.720, 0.920, 0.880, 0.750, 1.000],
//   'brick-bare':
//   [0.030, 0.030, 0.030, 0.030, 0.030, 0.040, 0.050, 0.070, 0.140],
//   'brick-painted':
//   [0.006, 0.007, 0.010, 0.010, 0.020, 0.020, 0.020, 0.030, 0.060],
//   'concrete-block-coarse':
//   [0.360, 0.360, 0.360, 0.440, 0.310, 0.290, 0.390, 0.250, 0.500],
//   'concrete-block-painted':
//   [0.092, 0.090, 0.100, 0.050, 0.060, 0.070, 0.090, 0.080, 0.160],
//   'curtain-heavy':
//   [0.073, 0.106, 0.140, 0.350, 0.550, 0.720, 0.700, 0.650, 1.000],
//   'fiber-glass-insulation':
//   [0.193, 0.220, 0.220, 0.820, 0.990, 0.990, 0.990, 0.990, 1.000],
//   'glass-thin':
//   [0.180, 0.169, 0.180, 0.060, 0.040, 0.030, 0.020, 0.020, 0.040],
//   'glass-thick':
//   [0.350, 0.350, 0.350, 0.250, 0.180, 0.120, 0.070, 0.040, 0.080],
//   'grass':
//   [0.050, 0.050, 0.150, 0.250, 0.400, 0.550, 0.600, 0.600, 0.600],
//   'linoleum-on-concrete':
//   [0.020, 0.020, 0.020, 0.030, 0.030, 0.030, 0.030, 0.020, 0.040],
//   'marble':
//   [0.010, 0.010, 0.010, 0.010, 0.010, 0.010, 0.020, 0.020, 0.040],
//   'metal':
//   [0.030, 0.035, 0.040, 0.040, 0.050, 0.050, 0.050, 0.070, 0.090],
//   'parquet-on-concrete':
//   [0.028, 0.030, 0.040, 0.040, 0.070, 0.060, 0.060, 0.070, 0.140],
//   'plaster-rough':
//   [0.017, 0.018, 0.020, 0.030, 0.040, 0.050, 0.040, 0.030, 0.060],
//   'plaster-smooth':
//   [0.011, 0.012, 0.013, 0.015, 0.020, 0.030, 0.040, 0.050, 0.100],
//   'plywood-panel':
//   [0.400, 0.340, 0.280, 0.220, 0.170, 0.090, 0.100, 0.110, 0.220],
//   'polished-concrete-or-tile':
//   [0.008, 0.008, 0.010, 0.010, 0.015, 0.020, 0.020, 0.020, 0.040],
//   'sheet-rock':
//   [0.290, 0.279, 0.290, 0.100, 0.050, 0.040, 0.070, 0.090, 0.180],
//   'water-or-ice-surface':
//   [0.006, 0.006, 0.008, 0.008, 0.013, 0.015, 0.020, 0.025, 0.050],
//   'wood-ceiling':
//   [0.150, 0.147, 0.150, 0.110, 0.100, 0.070, 0.060, 0.070, 0.140],
//   'wood-panel':
//   [0.280, 0.280, 0.280, 0.220, 0.170, 0.090, 0.100, 0.110, 0.220],
//   'uniform':
//   [0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500],


// */



// // let audioContext;
// // let scene;
// // let x;
// // let xSource;
// // let source;
// // let audioReady = false;



// // function initAudio(mode) {
// //   // Set room acoustics properties.
// //   let defaultDimensions = {
// //     width: 20,
// //     height: 20,
// //     depth: 20,
// //   };
  
// //   let defaultMaterial =  setAllRoomProperties('transparent');

// //   if(mode == 'default') {
// //     audioContext = new (window.AudioContext || window.webkitAudioContext);
  
// //     // Create a (1st-order Ambisonic) ResonanceAudio scene.
// //     scene = new ResonanceAudio(audioContext);
  
// //     // Send scene's rendered binaural output to stereo out.
// //     scene.output.connect(audioContext.destination);
  
// //     scene.setRoomProperties(defaultDimensions, defaultMaterial);
    
// //   }


//   // if(Object.keys(roomProperties).length < 6) {
//   // } else {
//   //   scene.setRoomProperties(defaultDimensions, roomProperties);
//   // }
  

//   //can add this into another function no?
//   // Create an audio element. Feed into audio graph.
// //   x = document.createElement('audio');
// //   x.src = 'solo-de-mi.mp3';
// //   x.crossOrigin = 'anonymous';
// //   x.load();

// //   xSource = audioContext.createMediaElementSource(x);

// //   // Create a Source, connect desired audio input to it.
// //   source = scene.createSource();
// //   xSource.connect(source.input);
// //   audioReady = true;
// // }


// // setAmbisonicOrder(order)

// // /**
// //  * Set the listener's position and orientation using a Three.js Matrix4 object.
// //  * @param {Object} matrix
// //  * The Three.js Matrix4 object representing the listener's world transform.
// //  */
// // ResonanceAudio.prototype.setListenerFromMatrix = function(matrix) {
// //   this._listener.setFromMatrix(matrix);

// //   // Update the rest of the scene using new listener position.
// //   this.setListenerPosition(this._listener.position[0],
// //     this._listener.position[1], this._listener.position[2]);
// // };


// // .setSpeedOfSound = function(speedOfSound) {

// //for tomorrow: make a scene that will take those room property parameters. 
// //consider a menu before the room properties one that you are able to set the speed of sound, ambisonic order, and maybe add more room wall props, maybe onnnnnnnnnn the menu before choosing the each wall one.
// //idk, think about it 


// // a-frame components relating to the Resonance Audio SDK and audio context 

// AFRAME.registerComponent('register-room-property', {
//   init: function () {
//         this.el.addEventListener('click', function (evt) {
//         let dimensions = 20;
//         let material = this.getAttribute("src").replace("#", "");
//         scene.setRoomProperties(setAllRoomDimensions(dimensions), setAllRoomProperties(material));
//         // var sceneEl = document.querySelector('a-scene');
//     });
//   }
// });


// AFRAME.registerComponent('listener', {
//   init () {
//       this.cameraMatrix4 = new AFRAME.THREE.Matrix4();
//   },
//   tick: function () { 
//       this.cameraMatrix4 = this.el.object3D.matrixWorld;
//       if(scene) 
//         scene.setListenerFromMatrix(this.cameraMatrix4);
//   }
// });

// AFRAME.registerComponent('default-menu-sound-source', {
//   init: function () {
//     this.wpVector = new THREE.Vector3();
//     var isPlaying = false;
    
//     // console.log(audioContext.state);
//     this.el.addEventListener('click', function () {
//       this.setAttribute('color', 'pink');
//       if(audioContext)
//         audioContext.resume();

//       if(isPlaying==false && x){
//         x.play();
//         isPlaying=true;
//       }else if(isPlaying==true && x){
//         x.pause();
//         isPlaying=false;
//       }
//     });
//   },
  
//   tick: function () {
//     if(source){
//       source.setPosition(this.el.object3D.getWorldPosition(this.wpVector).x, this.el.object3D.getWorldPosition(this.wpVector).y, this.el.object3D.getWorldPosition(this.wpVector).z);
//     }
//   }
// });




