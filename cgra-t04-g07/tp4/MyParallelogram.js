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

            0, 0, 0,    //4
            2, 0, 0,    //5
            1, 1, 0,    //6
            3, 1, 0,    //7
        ];

        this.indices = [
            1, 2, 0,
            2, 1, 3,
            //other side
            6, 5, 4,
            5, 6, 7
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

        this.texCoords = [
            0.25, 0.75,
            0.75, 0.75,
            0.5, 1,
            1, 1,

            0.25, 0.75,
            0.75, 0.75,
            0.5, 1,
            1, 1,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
