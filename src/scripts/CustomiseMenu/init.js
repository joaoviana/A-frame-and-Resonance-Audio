let customiseMenuObject = {
  roomProperties: {}
};

// CUSTOMISE MENU - 1
AFRAME.registerComponent("object-sound-src", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let sceneEl = document.querySelector("a-scene");
      if (this.id == "sphere-obj") {
        customiseMenuObject.geometry = "sphere";
      } else if (this.id == "cube-obj") {
        customiseMenuObject.geometry = "box";
      } else if (this.id == "torus-obj") {
        customiseMenuObject.geometry = "torus";
      }
      let mask = sceneEl.querySelector("#mask");
      mask.setAttribute(
        "template",
        "src",
        "./src/templates/customiseMenu/customiseMenu2.template"
      );
    });
  }
});

// CUSTOMISE MENU - 2

AFRAME.registerComponent("sound-file-selected", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let sceneEl = document.querySelector("a-scene");
      let mask = sceneEl.querySelector("#mask");
      let fileName = this.childNodes[1].components.text.attrValue.value;
      // get filename according to text box chosen
      if (fileName == "funky") {
        customiseMenuObject.soundFile = "funky.mp3";
      } else if (fileName == "trippy") {
        customiseMenuObject.soundFile = "trippy.mp3";
      } else if (fileName == "spoken") {
        customiseMenuObject.soundFile = "spoken.mp3";
      }
      mask.setAttribute(
        "template",
        "src",
        "./src/templates/customiseMenu/customiseMenu3.template"
      );
      console.log(customiseMenuObject);
    });
  }
});

// CUSTOMISE MENU - 3

AFRAME.registerComponent("register-selection", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      //   let sceneEl = document.querySelector("a-scene");
      //   let mask = sceneEl.querySelector("#mask");
      let wallMaterial = this.getAttribute("src").replace("#", "");
      let wall = this.getAttribute("class");

      //setting custom room materials
      if (wall == "floor-wall") {
        customiseMenuObject.roomProperties.floor = wallMaterial;
      } else if (wall == "ceiling-wall") {
        customiseMenuObject.roomProperties.ceiling = wallMaterial;
      } else if (wall == "left-wall") {
        customiseMenuObject.roomProperties.left = wallMaterial;
      } else if (wall == "right-wall") {
        customiseMenuObject.roomProperties.right = wallMaterial;
      } else if (wall == "front-wall") {
        customiseMenuObject.roomProperties.front = wallMaterial;
      } else if (wall == "back-wall") {
        customiseMenuObject.roomProperties.back = wallMaterial;
      }
    });
  }
});

AFRAME.registerComponent("set-props-button", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let sceneEl = document.querySelector("a-scene");
      let mask = sceneEl.querySelector("#mask");
      mask.setAttribute(
        "template",
        "src",
        "./src/templates/customiseMenu/customiseMenu4.template"
      );
      console.log(customiseMenuObject);
    });
  }
});

// CUSTOMISE MENU - 4

AFRAME.registerComponent("register-speed-of-sound", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let speedOfSound = this.childNodes[1].components.text.attrValue.value;
      // get speed of sound according to text box chosen
      if (speedOfSound == "343") {
        customiseMenuObject.speedOfSound = 343;
      } else if (speedOfSound == "500") {
        customiseMenuObject.speedOfSound = 500;
      } else if (speedOfSound == "240") {
        customiseMenuObject.speedOfSound = 240;
      }
    });
  }
});

AFRAME.registerComponent("register-sound-src-gain", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let gain = this.childNodes[1].components.text.attrValue.value;
      // get gain according to text box chosen
      if (gain == "1") {
        customiseMenuObject.gain = 1;
      } else if (gain == "0.7") {
        customiseMenuObject.gain = 0.7;
      } else if (gain == "0.5") {
        customiseMenuObject.gain = 0.5;
      }
    });
  }
});

AFRAME.registerComponent("register-rolloff", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let rolloff = this.childNodes[1].components.text.attrValue.value;
      customiseMenuObject.rolloff = rolloff;
    });
  }
});

AFRAME.registerComponent("set-extra-props-button", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let sceneEl = document.querySelector("a-scene");
      let mask = sceneEl.querySelector("#mask");
      mask.setAttribute(
        "template",
        "src",
        "./src/templates/customiseMenu/customiseMenu5.template"
      );
      console.log(customiseMenuObject);
      handleCustomisedSelection(customiseMenuObject);
    });
  }
});
