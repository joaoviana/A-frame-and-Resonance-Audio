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
         sky.setAttribute('visible', 'false');
         environment.setAttribute('environment','active: true');
 
         //showing the wireframe setup
         let wireframe = sceneEl.querySelector('#wire-frame');
         wireframe.setAttribute('visible', 'true');

        if (menuSelected == "Localisation") {
          mask.setAttribute(
            "template",
            "src",
            "./src/templates/learnMenu/learnMenu-localisation.template"
          );
         
  
          //initialising the localisation audio context
          
          
        } else if (menuSelected == "Occlusion") {
            console.log('INSIDE OCCLUSION');
            mask.setAttribute(
              "template",
              "src",
              "./src/templates/learnMenu/learnMenu-occlusion.template"
            );
            // initOcclusionAudioContext();
           //initialising the occlusion audio context
          //
        } else if (menuSelected == "Late") {
          mask.setAttribute(
            "template",
            "src",
            "./src/templates/learnMenu/learnMenu-lateReflections.template"
          );
          //
           //initialising the late reflections audio context
        }
      });
    }
  });



// upon click of a box, change the source of the mask!

// also init of resonance audio functions


// handle room dimensions! 

// and probably the position of the camera at mounted/init lol