const { THREE } = require("aframe");

/* globals AFRAME THREE */
{
    AFRAME.registerComponent('position-emitter', {
        dependencies: [],

        schema: {
            websocket_url: {} //TODO Do?
        },

        center: new THREE.Vector3(),

        init: function () {
            let self = this;
            document.addEventListener('keyup', function (event) {
                if(event.shiftKey || event.ctrlKey) return;
                if (event.keyCode === 82) {
                    // Reset pos (r)
                    self.resetCenter();
                }
            });
        },

        update: function () {
        },

        play: function () {
        },

        pause: function () {
        },

        onButtonEvent: function (id, evtName) {
        },

        resetCenter: function() {
            if (!this.center) {
                this.center = new THREE.Vector3();
            }
            this.center.setFromMatrixPosition(this.el.object3D.matrixWorld);
        },

        tick: function (time, delta) {
            var worldPos = new THREE.Vector3();
            worldPos.setFromMatrixPosition(this.el.object3D.matrixWorld);
            //console.log(worldPos.y);

            if (!this.center) {
                this.resetCenter();
            }

            //console.log("tick", worldPos);
            sendXYZG(worldPos.x-this.center.x, worldPos.y-this.center.y, worldPos.z-this.center.z, 0);
        }
    });
}