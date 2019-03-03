AFRAME.registerComponent('animate-menu-on-hover', {
    init: function () {
        this.el.addEventListener('mouseover', function (evt) {
            this.setAttribute('material', 'color', '#75818b');
        });
        this.el.addEventListener('mouseout', function (evt) {
            this.removeAttribute('material', 'color', '#75818b');
        });
    }
});

AFRAME.registerComponent('animate-default-menu-item-on-hover', {
    init: function () {
    this.el.addEventListener('mouseover', function (evt) {
        this.object3D.scale.set(0.7, 0.7, 0.05);
    });
    this.el.addEventListener('mouseout', function (evt) {
        this.object3D.scale.set(.5, .5, .03);
        // scale=".5 .5 .03"
        });
    }
});

AFRAME.registerComponent('animate-menu-item-on-hover', {
    init: function () {
        this.el.addEventListener('mouseover', function (evt) {
            this.object3D.scale.set(0.3, 0.3, 0.05);
        });
        this.el.addEventListener('mouseout', function (evt) {
            this.object3D.scale.set(.27, .27, .03);
        });
    }
});

AFRAME.registerComponent('go-back', {
    init: function () {
        this.el.addEventListener('click', function (evt) {
            let sceneEl = document.querySelector("a-scene");
            let mask = sceneEl.querySelector("#mask");
            if(this.id == 'go-back-selection-menu') {
                console.log(mask);
                mask.setAttribute(
                    "template",
                    "src",
                    "./src/templates/selectionMenu/selectionMenu.template"
                );
            } else if(this.id == 'go-back-main-menu') {
                console.log(mask);
                mask.setAttribute(
                    "template",
                    "src",
                    "./src/templates/mainMenu/mainMenu.template"
                );
            }
        });
    }
});


// let sceneEl = document.querySelector("a-scene");
//       let mask = sceneEl.querySelector("#mask");
//       // let selectionMenu = sceneEl.querySelector('#selection-menu');
//       // let defaultMenu = sceneEl.querySelector('#default-menu');
//       // let customiseMenu = sceneEl.querySelector('#customise-menu');
//       // let learnMenu = sceneEl.querySelector('#learn-menu');
//       let menuSelected = this.childNodes[1].components.text.attrValue.value;

//       //hide selectionMenu
//       // selectionMenu.setAttribute("visible", 'false');

//       //set attribute visible to default-menu customise-menu and learn-menu
//       if (menuSelected == "default") {
//         // defaultMenu.setAttribute("visible", 'true');
//         mask.setAttribute(
//           "template",
//           "src",
//           "./src/templates/defaultMenu/defaultMenu.template"
//         );