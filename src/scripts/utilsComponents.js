AFRAME.registerComponent("listener", {
  schema: {
    color: {default: '#FFF'},
    size: {type: 'int', default: 5}
  },
  init() {
    console.log('SCHEMA WORKED: ',this.data.color);
    this.cameraMatrix4 = new AFRAME.THREE.Matrix4();
  },
  tick: function() {
    this.cameraMatrix4 = this.el.object3D.matrixWorld;
    if (defaultScene) defaultScene.setListenerFromMatrix(this.cameraMatrix4);

  }
});

AFRAME.registerComponent("animate-menu-on-hover", {
  init: function() {
    this.el.addEventListener("mouseover", function(evt) {
      this.setAttribute("material", "color", "#75818b");
    });
    this.el.addEventListener("mouseout", function(evt) {
      this.removeAttribute("material", "color", "#75818b");
    });
  }
});

AFRAME.registerComponent("animate-default-menu-item-on-hover", {
  init: function() {
    this.el.addEventListener("mouseover", function(evt) {
      this.object3D.scale.set(0.7, 0.7, 0.05);
    });
    this.el.addEventListener("mouseout", function(evt) {
      this.object3D.scale.set(0.5, 0.5, 0.03);
      // scale=".5 .5 .03"
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
        console.log('audio context: ', defaultAudioContext);
        console.log('scene: ', defaultScene);
        defaultAudioContext = null;
        defaultScene = null
        console.log('scene after null: ', defaultScene);
        console.log('audio context after null: ', defaultAudioContext);
        defaultSoundSource.disconnect(defaultSource.input);
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