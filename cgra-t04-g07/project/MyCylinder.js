import {CGFobject} from '../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        /*this.vertices.push(0, 0, 0);
        this.normals.push(0,0,0);
        this.texCoords.push(0, -1, 0);
        this.vertices.push(0,1,0);
        this.normals.push(0,0,0);
        this.texCoords.push(0, 1, 0);*/

        for(var i = 0; i <= this.slices; i++ ){

            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            ang+=alphaAng;

            if(i > 0){
                this.indices.push(2*i-2,2*i-1, 2*i+1);
                this.indices.push(2*i+1,2*i, 2*i-2);
            }

            this.texCoords.push(i*(1/this.slices), 0);
            this.texCoords.push(i*(1/this.slices), 1);


        }



        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
