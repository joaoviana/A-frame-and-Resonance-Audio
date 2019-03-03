AFRAME.registerComponent("select-menu-box", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let sceneEl = document.querySelector("a-scene");
      let mask = sceneEl.querySelector("#mask");
      // let selectionMenu = sceneEl.querySelector('#selection-menu');
      // let defaultMenu = sceneEl.querySelector('#default-menu');
      // let customiseMenu = sceneEl.querySelector('#customise-menu');
      // let learnMenu = sceneEl.querySelector('#learn-menu');
      let menuSelected = this.childNodes[1].components.text.attrValue.value;

      //hide selectionMenu
      // selectionMenu.setAttribute("visible", 'false');

      //set attribute visible to default-menu customise-menu and learn-menu
      if (menuSelected == "default") {
        // defaultMenu.setAttribute("visible", 'true');
        mask.setAttribute(
          "template",
          "src",
          "./src/templates/defaultMenu/defaultMenu.template"
        );
        initAudioDefault();
        //
      } else if (menuSelected == "customise") {
        mask.setAttribute(
          "template",
          "src",
          "./src/templates/customiseMenu/customiseMenu1.template"
        );
        //
      } else if (menuSelected == "learn") {
        //
      }
    });
  }
});
