AFRAME.registerComponent("select-menu-box", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let sceneEl = document.querySelector("a-scene");
      let mask = sceneEl.querySelector("#mask");
      let menuSelected = this.childNodes[1].components.text.attrValue.value;

      //set attribute visible to default-menu customise-menu and learn-menu
      if (menuSelected == "default") {
        mask.setAttribute(
          "template",
          "src",
          "./src/templates/defaultMenu/defaultMenu.template"
        );
        //hiding a-sky and making environment visible
        let sky = sceneEl.querySelector("#sky");
        let environment = sceneEl.querySelector("#environment");
        sky.setAttribute('visible', 'false');
        environment.setAttribute('environment','active: true');

        //initialising the audio context
        initAudioDefault();
        
      } else if (menuSelected == "customise") {
        mask.setAttribute(
          "template",
          "src",
          "./src/templates/customiseMenu/customiseMenu1.template"
        );
        //
      } else if (menuSelected == "learn") {
        mask.setAttribute(
          "template",
          "src",
          "./src/templates/learnMenu/learnMenu1.template"
        );
      }
    });
  }
});
