
let roomProperties = {};



AFRAME.registerComponent('start-button', {
    init: function () {
        this.el.addEventListener('click', function (evt) {
            let sceneEl = document.querySelector('a-scene');
            let mainMenu = sceneEl.querySelector('#main-menu');
            let selectionMenu = sceneEl.querySelector('#selection-menu');
            // console.log(selectionMenu);
            mainMenu.setAttribute("visible", false);
            selectionMenu.setAttribute("visible", true);
        });
    }
});

AFRAME.registerComponent('select-menu-box', {
    init: function () {
        this.el.addEventListener('click', function (evt) {
            let sceneEl = document.querySelector('a-scene');
            let selectionMenu = sceneEl.querySelector('#selection-menu');
            let defaultMenu = sceneEl.querySelector('#default-menu');
            let customiseMenu = sceneEl.querySelector('#customise-menu');
            let learnMenu = sceneEl.querySelector('#learn-menu');
            let menuSelected = this.childNodes[1].components.text.attrValue.value;

            //hide selectionMenu
            selectionMenu.setAttribute("visible", false);

            //set attribute visible to default-menu customise-menu and learn-menu
            if(menuSelected == 'default') {
                defaultMenu.setAttribute("visible", true);
                initAudio('default');
                //
            } else if(menuSelected == 'customise') {
                //
            } else if(menuSelected == 'learn') {
                //
            }

        });
    }
});

AFRAME.registerComponent('testing-menu', {
    init: function () {
        initAudio('default');
    }
});



AFRAME.registerComponent('set-props-button', {
    init: function () {
        this.el.addEventListener('click', function (evt) {
            //call set room props and hide menus
            let sceneEl = document.querySelector('a-scene');
            let menuTitle = sceneEl.querySelector('#room-props-title');
            let allMenus = sceneEl.getElementsByClassName("room-props-menu");
            let setPropsButton = sceneEl.querySelector(".room-props-button");
            for(var i = 0; i < allMenus.length; i++){
                allMenus[i].setAttribute("visible", false);
            }
            menuTitle.setAttribute("visible", false);
            setPropsButton.setAttribute("visible", false);
            
            console.log('room properties to send: ',roomProperties);
            // initAudio();
        });
    }
});


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

AFRAME.registerComponent('register-selection', {
    init: function () {
        this.el.addEventListener('click', function (evt) {
            let wallMaterial = this.getAttribute("src").replace("#", "");
            let wall = this.getAttribute("class");
            if(wall == "floor-wall") {
                roomProperties.floor = wallMaterial;

            } else if(wall == "ceiling-wall") {
                roomProperties.ceiling = wallMaterial;

            } else if(wall == "left-wall") {
                roomProperties.left = wallMaterial;
                
            } else if(wall == "right-wall") {
                roomProperties.right = wallMaterial;

            } else if(wall == "front-wall") {
                roomProperties.front = wallMaterial;

            } else if(wall == "back-wall") {
                roomProperties.back = wallMaterial;
            }
        });
    }
});