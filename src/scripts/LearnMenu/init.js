//handle clicks here

AFRAME.registerComponent("learn-menu-selection", {
    init: function() {
      this.el.addEventListener("click", function(evt) {
        let sceneEl = document.querySelector("a-scene");
        let mask = sceneEl.querySelector("#mask");
        //Get text value from menu selected from the learn menu
        let menuSelected = this.childNodes[1].components.text.attrValue.value;

         //hiding a-sky and making environment visible
         let sky = sceneEl.querySelector("#sky");
         let environment = sceneEl.querySelector("#environment");
         let ambientLight = sceneEl.querySelector("#ambient-light");
         let directionalLight = sceneEl.querySelector("#directional-light");
         sky.setAttribute('visible', 'false');
         environment.setAttribute('environment','active: true');
         console.log('menu selected: ', menuSelected);

        //  <a-entity id="ambient-light" light="type: ambient; color: #CCC"></a-entity>
        // <a-entity id="directional-light" light="type: directional; color: #EEE; intensity: 0.5" position="-1 1 0"></a-entity>


        if (menuSelected == "Occlusion") {
            console.log('INSIDE OCCLUSION');
            mask.setAttribute(
              "template",
              "src",
              "./src/templates/learnMenu/learnMenu-occlusion.template"
            );
            initOcclusionAudioContext();
           //initialising the occlusion audio context
          //
        } else if (menuSelected == "Late") {
          console.log('here')
          ambientLight.setAttribute('light', 'intensity: 0');
          directionalLight.setAttribute('light', 'intensity: 0');
          sky.setAttribute('visible', 'true');
          sky.setAttribute('visible', 'true');
          sky.setAttribute('material','topColor: 0 0 0');
          sky.setAttribute('material','bottomColor: 20 20 20');
          environment.setAttribute('environment', 'skyType: gradient');
          environment.setAttribute('environment', 'lighting: none');
          environment.setAttribute('environment', 'skyColor: #000');
          environment.setAttribute('environment', 'preset: threetowers');
          environment.setAttribute('environment', 'groundTexture: walkernoise');
          environment.setAttribute('environment', 'fog: 0.5');
          environment.setAttribute('environment', 'dressing: trees');
          environment.setAttribute('environment', 'dressingAmount: 20');
          sceneEl.setAttribute('fog','type: exponential');
          sceneEl.setAttribute('fog','density: 0.15');
          sceneEl.setAttribute('fog','color: #111');
          // initSceneAudioContext();
         
          mask.setAttribute(
            "template",
            "src",
            "./src/templates/learnMenu/learnMenu-lateReflections.template"
          );
          initCaveAudioContext();
          //
           //initialising the late reflections audio context
        }
      });
    }
  });
