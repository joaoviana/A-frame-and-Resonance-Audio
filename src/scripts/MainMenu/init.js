AFRAME.registerComponent('start-button', {
    init: function () {
        this.el.addEventListener('click', function (evt) {
            let sceneEl = document.querySelector('a-scene');
            let mask = sceneEl.querySelector('#mask');
            // let selectionMenu = sceneEl.querySelector('#selection-menu');

            console.log(mask);
            // console.log(selectionMenu);

            // mainMenu.setAttribute('template', 'src', '');
            // console.log(mainMenu);
            //moving from main menu to selection menu
            mask.setAttribute('template', 'src', './src/templates/selectionMenu/selectionMenu.template');
            console.log(mask)
            //  self.el.setAttribute('template', 'src', self.data[self.index++]);
            // mainMenu.setAttribute("visible", 'false');
            // selectionMenu.setAttribute("visible", 'false');
        });
    }
});