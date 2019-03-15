AFRAME.registerComponent('start-button', {
    init: function () {
        this.el.addEventListener('click', function (evt) {
            let sceneEl = document.querySelector('a-scene');
            let mask = sceneEl.querySelector('#mask');
            mask.setAttribute('template', 'src', './src/templates/selectionMenu/selectionMenu.template');
        });
    }
});