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
