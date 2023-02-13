import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,    //0
            2, 0, 0,    //1
            1, 1, 0,    //2
            3, 1, 0,    //3

            0, 0, 0,    //0
            2, 0, 0,    //1
            1, 1, 0,    //2
            3, 1, 0,    //3
        ];

        this.indices = [
            1, 2, 0,
            2, 1, 3,
            //other side
            2, 1, 0,
            1, 2, 3
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
