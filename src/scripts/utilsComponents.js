AFRAME.registerComponent("listener", {
  schema: {
    color: {default: '#FFF'},
    size: {type: 'int', default: 5}
  },
  init() {
    console.log('SCHEMA WORKED: ',this.data.color);
    this.cameraMatrix4 = new AFRAME.THREE.Matrix4();
    console.log('cameria matrix: ',this.cameraMatrix4);
  },
  tick: function() {
    this.cameraMatrix4 = this.el.object3D.matrixWorld;
    if (defaultScene)  {
      defaultScene.setListenerFromMatrix(this.cameraMatrix4);
    }
    if (customScene) {
      customScene.setListenerFromMatrix(this.cameraMatrix4);
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
    if (defaultSource) {
      defaultSource.setPosition(
        this.el.object3D.getWorldPosition(this.wpVector).x,
        this.el.object3D.getWorldPosition(this.wpVector).y,
        this.el.object3D.getWorldPosition(this.wpVector).z
      );
    }
  }
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
         let wireframe = sceneEl.querySelector('#wire-frame');
         wireframe.setAttribute('visible', 'false');
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