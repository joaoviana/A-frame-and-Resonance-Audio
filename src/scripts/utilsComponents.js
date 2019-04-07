var cameraPosition;

AFRAME.registerComponent("listener", {
  schema: {
    color: {default: '#FFF'},
    size: {type: 'int', default: 5}
  },
  init() {
    // console.log('SCHEMA WORKED: ',this.data.color);
    this.cameraMatrix4 = new AFRAME.THREE.Matrix4();
    // console.log('cameria matrix: ',this.cameraMatrix4);
  },
  tick: function() {
    this.cameraMatrix4 = this.el.object3D.matrixWorld;

    
    if (defaultScene)  {
      // defaultScene.setListenerFromMatrix(
      //   new THREE.Matrix4().multiplyMatrices(
      //     new THREE.Matrix4().getInverse(this.el.object3D.matrixWorld),
      //     this.el.sceneEl.camera.el.object3D.matrixWorld
      //   )
      // )
      defaultScene.setListenerFromMatrix(this.cameraMatrix4);
    }
    if (customScene) {
      customScene.setListenerFromMatrix(this.cameraMatrix4);
    }
    // if (occlusionScene) {
    //   occlusionScene.setListenerFromMatrix(this.cameraMatrix4);
    // }
    // if (mainScene) {
    //   mainScene.setListenerFromMatrix(this.cameraMatrix4);
    // }
    if (caveScene) {
      caveScene.setListenerFromMatrix(
      new THREE.Matrix4().multiplyMatrices(
        new THREE.Matrix4().getInverse(this.el.object3D.matrixWorld),
        this.el.sceneEl.camera.el.object3D.matrixWorld
      )
    )
      // caveScene.setListenerFromMatrix(this.cameraMatrix4);
    }
  }
});

AFRAME.registerComponent("sound-source", {
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
    // console.log('get world position', this.el.object3D.getWorldPosition(this.wpVector).x + this.el.sceneEl.camera.el.object3D.matrixWorld.x)
    //needs to be relative to camera, so i need to get the cameras position and rotation to 
    if (defaultSource) {
      var cameraEl = this.el.sceneEl.camera.el;
      var rotation = cameraEl.getAttribute('rotation');
      defaultSource.setPosition(
        rotation.x,
        rotation.y,
        rotation.z,
      )
      // console.log('camera? ', this.el.sceneEl.camera.el.object3D.matrixWorld)
      // defaultSource.setPosition(new THREE.Matrix4().multiplyMatrices(
      //   new THREE.Matrix4().getInverse(this.el.object3D.matrixWorld),
      //   this.el.sceneEl.camera.el.object3D.matrixWorld
      // ))
      defaultSource.setPosition(
        this.el.object3D.getWorldPosition(this.wpVector).x - cameraPosition.x,
        this.el.object3D.getWorldPosition(this.wpVector).y - cameraPosition.y,
        this.el.object3D.getWorldPosition(this.wpVector).z - cameraPosition.z
      );
    }
  }
});

AFRAME.registerComponent('camera-logger', {

  schema: {
    timestamp: {type: 'int'},
    seconds: {type: 'int'} // default 0
  },

  log : function () {
    var cameraEl = this.el.sceneEl.camera.el;
    var rotation = cameraEl.getAttribute('rotation');
    var worldPos = new THREE.Vector3();
    // console.log('camera? ', this.el.sceneEl.camera.el.object3D.matrixWorld)
    worldPos.setFromMatrixPosition(cameraEl.object3D.matrixWorld);
    // console.log("Time: " + this.data.seconds 
    //             + "; Camera Position: (" + worldPos.x.toFixed(2) + ", " + worldPos.y.toFixed(2) + ", " + worldPos.z.toFixed(2) 
    //             + "); Camera Rotation: (" + rotation.x.toFixed(2) + ", " + rotation.y.toFixed(2) + ", " + rotation.z.toFixed(2) + ")");        
    return worldPos;
              },

  play: function () {
    this.data.timestamp = Date.now();
    this.log();
  },

  tick: function () {  
    if (Date.now() - this.data.timestamp > 1000) {
      this.data.timestamp += 1000;
      this.data.seconds += 1;
      cameraPosition = this.log();
    }
    // cameraPosition = this.worldPos;
    // console.log('VARIABLE', cameraPosition);
  },
});

AFRAME.registerComponent("animate-menu-on-hover", {
  init: function() {
    this.el.addEventListener("mouseover", function(evt) {
      this.object3D.scale.set(0.7, 0.7, 0.7);
    });
    this.el.addEventListener("mouseout", function(evt) {
      this.object3D.scale.set(1, 1, 1);
    });
  }
});

AFRAME.registerComponent("animate-default-menu-item-on-hover", {
  init: function() {
    this.el.addEventListener("mouseover", function(evt) {
      this.object3D.scale.set(0.9, 0.9, 0.05);
    });
    this.el.addEventListener("mouseout", function(evt) {
      this.object3D.scale.set(0.7, 0.7, 0.03);
    });
  }
});

AFRAME.registerComponent("animate-menu-item-on-hover", {
  init: function() {
    this.el.addEventListener("mouseover", function(evt) {
      this.object3D.scale.set(0.3, 0.3, 0.05);
    });
    this.el.addEventListener("mouseout", function(evt) {
      this.object3D.scale.set(0.27, 0.27, 0.03);
    });
  }
});

AFRAME.registerComponent("go-back", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let sceneEl = document.querySelector("a-scene");
      let mask = sceneEl.querySelector("#mask");

      if (this.id == "go-back-main-menu") {
        console.log(mask);
        mask.setAttribute(
          "template",
          "src",
          "./src/templates/mainMenu/mainMenu.template"
        );
      } else if (this.id == "go-back-selection-menu") {
         //hiding environment and making a-sky visible
         let sceneEl = document.querySelector("a-scene");
         let sky = sceneEl.querySelector("#sky");
         let environment = sceneEl.querySelector("#environment");
         sky.setAttribute('visible', 'true');
         environment.setAttribute('environment','active: false');       
         //hiding the wireframe setup
        //  let wireframe = sceneEl.querySelector('#wire-frame');
        //  wireframe.setAttribute('visible', 'false');
        if (defaultAudioContext || defaultScene) {
          defaultSoundSource.disconnect(defaultSource.input);
          defaultAudioContext = null;
          defaultScene = null;
        }
        if (customAudioContext || customScene) {
          customAudioSource.disconnect(customSource.input);
          customAudioContext = null;
          customScene = null
        }
        if (occlusionAudioContext || occlusionScene) {
          humanSoundSource.disconnect(occlusionSource1.input);
          human2SoundSource.disconnect(occlusionSource2.input);
          sineSoundSource.disconnect(occlusionSource3.input);
          occlusionAudioContext = null;
          occlusionScene = null;
        }
        mask.setAttribute(
          "template",
          "src",
          "./src/templates/selectionMenu/selectionMenu.template"
        );
      } else if (this.id == "go-back-customise-menu-1") {
        console.log(mask);
        mask.setAttribute(
          "template",
          "src",
          "./src/templates/customiseMenu/customiseMenu1.template"
        );
      } else if (this.id == "go-back-customise-menu-2") {
        console.log(mask);
        mask.setAttribute(
          "template",
          "src",
          "./src/templates/customiseMenu/customiseMenu2.template"
        );
      } else if (this.id == "go-back-customise-menu-3") {
        console.log(mask);
        mask.setAttribute(
          "template",
          "src",
          "./src/templates/customiseMenu/customiseMenu3.template"
        );
      } else if (this.id == "go-back-customise-menu-4") {
        console.log(mask);
        mask.setAttribute(
          "template",
          "src",
          "./src/templates/customiseMenu/customiseMenu4.template"
        );
      }
    });
  }
});