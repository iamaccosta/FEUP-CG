import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTriangleBig extends CGFobject {
    constructor(scene, type) {
        super(scene);

        this.initBuffers(type);
    }

    initBuffers(type) {
        this.vertices = [
            0, 2, 0,    //0
            -2, 0, 0,   //1
            2, 0, 0     //2
        ];

        this.indices = [
            0, 1, 2
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        if(type == 0){
            this.texCoords = [
                0.5, 0.5,
                1, 1,
                1, 0
            ];
        }
        else{
            this.texCoords =[
                0.5, 0.5,
                1, 0,
                0, 0
            ];
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
