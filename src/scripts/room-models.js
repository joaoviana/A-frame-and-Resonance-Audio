// let audioContext;
// let scene;
// let x;
// let y;
// let ySource;
// let xSource;
// let source;
// let audioReady = false;

// //  <!-- curtains foam transparent marble -->


// /**
//  * @private
//  */
// function initAudio() {
//   audioContext = new (window.AudioContext || window.webkitAudioContext);

//   // Create a (1st-order Ambisonic) ResonanceAudio scene.
//   scene = new ResonanceAudio(audioContext);

//   // Send scene's rendered binaural output to stereo out.
//   scene.output.connect(audioContext.destination);

//   // Set room acoustics properties.
//   let dimensions = {
//     width: 20,
//     height: 20,
//     depth: 20,
//   };
  
//   let glass = {
//     left: 'wood-panel',
//     right: 'wood-panel',
//     front: 'wood-panel',
//     back: 'wood-panel',
//     down: 'wood-panel',
//     up: 'wood-panel',
//   };

//   scene.setRoomProperties(dimensions, glass);

//   // Create an audio element. Feed into audio graph.
//   x = document.createElement('audio');
//   x.src = 'ryokan.mp3';
//   x.crossOrigin = 'anonymous';
//   x.load();

//   xSource = audioContext.createMediaElementSource(x);

//   // Create a Source, connect desired audio input to it.
//   source = scene.createSource();
//   xSource.connect(source.input);
//   audioReady = true;
// }


// initAudio();

// function addElement() {
//   // Create an audio element. Feed into audio graph.
//   y = document.createElement('audio');
//   y.src = 'solo-de-mi.mp3';
//   y.crossOrigin = 'anonymous';
//   y.loop = true;
//   y.load();

//   ySource = audioContext.createMediaElementSource(y);

//   // Create a Source, connect desired audio input to it.
//   source = scene.createSource();
//   ySource.connect(source.input);
//   audioReady = true;
// }


// AFRAME.registerComponent('listener', {
//   init () {
//     this.cameraMatrix4 = new AFRAME.THREE.Matrix4()
// },
//   tick: function () { 
//     this.cameraMatrix4 = this.el.object3D.matrixWorld;
//     scene.setListenerFromMatrix(this.cameraMatrix4);
// }
// });

// AFRAME.registerComponent('y', {
//   init: function () {
//     var isPlaying = false;
//     console.log(audioContext.state);
//     this.el.addEventListener('click', function () {

//       audioContext.resume();
//        if(isPlaying==false){
//         y.play();
//         isPlaying=true;
//        }else if(isPlaying==true){
//          y.pause();
//          isPlaying=false;
//        }
//     });
//   },
  
//   tick: function () {
//     source.setPosition(this.el.object3D.getWorldPosition().x, this.el.object3D.getWorldPosition().y, this.el.object3D.getWorldPosition().z);
//   }
// });

// AFRAME.registerComponent('x', {
//   init: function () {
//     var isPlaying = false;
//     console.log(audioContext.state);
//     this.el.addEventListener('click', function () {

//       audioContext.resume();
//        if(isPlaying==false){
//         x.play();
//         var sceneEl = document.querySelector('a-scene');
//         sceneEl.querySelector('#text1').setAttribute('visible', false);
//         sceneEl.querySelector('#text2').setAttribute('visible', false);
//         isPlaying=true;
//        }else if(isPlaying==true){
//          x.pause();
//          isPlaying=false;
//        }
//     });
// },
  
//   tick: function () {
//     source.setPosition(this.el.object3D.getWorldPosition().x, this.el.object3D.getWorldPosition().y, this.el.object3D.getWorldPosition().z);
//   }
// });

// AFRAME.registerComponent('curtains', {
//   init: function () {
//     let dimensions = {
//       width: 20,
//       height: 20,
//       depth: 20,
//     };

//     let curtains = {
//       left: 'curtain-heavy',
//       right: 'curtain-heavy',
//       front: 'curtain-heavy',
//       back: 'curtain-heavy',
//       down: 'curtain-heavy',
//       up: 'curtain-heavy',
//     };
//        this.el.addEventListener('click', function (evt) {
//         scene.setRoomProperties(dimensions, curtains);
//         var sceneEl = document.querySelector('a-scene');
//         // sceneEl.querySelector('#wall').setAttribute('material', {color: '#f44336', wireframe: true,shader:'flat'});
//         // sceneEl.querySelector('#ground').setAttribute('material', {color: '#f44336', wireframe: true,shader:'flat'});
      
//     });
//   }


// });

// // AFRAME.registerComponent('glass', {
// //   init: function () {
// //     let dimensions = {
// //       width: 20,
// //       height: 20,
// //       depth: 20,
// //     };

// //     let glass = {
// //       left: 'glass-thin',
// //       right: 'glass-thin',
// //       front: 'glass-thin',
// //       back: 'glass-thin',
// //       down: 'glass-thin',
// //       up: 'glass-thin',
// //     };
// //        this.el.addEventListener('click', function (evt) {
// //         scene.setRoomProperties(dimensions, glass);
// //         var sceneEl = document.querySelector('a-scene');
// //         // sceneEl.querySelector('#wall').setAttribute('material', {color: '#42b9f4', wireframe: true,shader:'flat'});
// //         // sceneEl.querySelector('#ground').setAttribute('material', {color: '#42b9f4', wireframe: true,shader:'flat'});
      
// //     });
// //   }


// // });

// AFRAME.registerComponent('marble', {
//   init: function () {
//     let dimensions = {
//       width: 20,
//       height: 20,
//       depth: 20,
//     };

//     let marble = {
//       left: 'marble',
//       right: 'marble',
//       front: 'marble',
//       back: 'marble',
//       down: 'marble',
//       up: 'marble',
//     };
  
//        this.el.addEventListener('click', function (evt) {
//         scene.setRoomProperties(dimensions, marble);
//         console.log(document.querySelector('a-scene'));
//         var sceneEl = document.querySelector('a-scene');
//     });
//   }
// });

// AFRAME.registerComponent('transparent', {
//   init: function () {
//     let dimensions = {
//       width: 20,
//       height: 20,
//       depth: 20,
//     };

//     let concrete = {
//       left: 'transparent',
//       right: 'transparent',
//       front: 'transparent',
//       back: 'transparent',
//       down: 'transparent',
//       up: 'transparent',
//     };
  
//        this.el.addEventListener('click', function (evt) {
//         scene.setRoomProperties(dimensions, concrete);
//         var sceneEl = document.querySelector('a-scene');
//         // sceneEl.querySelector('#wall').setAttribute('material', {color: 'white', wireframe: true,shader:'flat',opacity: 0});
//         // sceneEl.querySelector('#ground').setAttribute('material', {color: 'white', wireframe: true,shader:'flat',opacity: 0});
//     });
//   }
// });

// // AFRAME.registerComponent('wood', {
// //   init: function () {
// //     let dimensions = {
// //       width: 20,
// //       height: 20,
// //       depth: 20,
// //     };

// //     let wood = {
// //       left: 'wood-panel',
// //       right: 'wood-panel',
// //       front: 'wood-panel',
// //       back: 'wood-panel',
// //       down: 'wood-panel',
// //       up: 'wood-panel',
// //     };
  
// //        this.el.addEventListener('click', function (evt) {
// //         scene.setRoomProperties(dimensions, wood);
// //         var sceneEl = document.querySelector('a-scene');
// //     });
// //   }
// // });

// AFRAME.registerComponent('foam', {
//   init: function () {
//     let dimensions = {
//       width: 20,
//       height: 20,
//       depth: 20,
//     };

//     let brick = {
//       left: 'acoustic-ceiling-tiles',
//       right: 'acoustic-ceiling-tiles',
//       front: 'acoustic-ceiling-tiles',
//       back: 'acoustic-ceiling-tiles',
//       down: 'acoustic-ceiling-tiles',
//       up: 'acoustic-ceiling-tiles',
//     };
  
//        this.el.addEventListener('click', function (evt) {
//         var sphere=document.getElementById("sphere2");
//         console.log(sphere);
//         sphere.setAttribute('color','blue');
//         // var sphere = $("#sphere2");
//         sphere.setAttribute("visible",true);
//         addElement();
//         scene.setRoomProperties(dimensions, brick);
//         var sceneEl = document.querySelector('a-scene');
//         // sceneEl.querySelector('#wall').setAttribute('material', {color: 'black', wireframe: true,shader:'flat'});
//         // sceneEl.querySelector('#ground').setAttribute('material', {color: 'black', wireframe: true,shader:'flat'});
//     });
//   }
// });




