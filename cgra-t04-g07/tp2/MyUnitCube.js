import { CGFobject } from "../lib/CGF.js";
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            -0.5, -0.5, -0.5,   //0
            -0.5, -0.5, 0.5,    //1
            -0.5, 0.5, 0.5,     //2
            -0.5, 0.5, -0.5,    //3
            0.5, -0.5, -0.5,    //4
            0.5, -0.5, 0.5,     //5
            0.5, 0.5, 0.5,      //6
            0.5, 0.5, -0.5      //7
        ];

        this.indices = [
            0, 1, 2,
            2, 3, 0,
            5, 4, 7,
            7, 6, 5,
            1, 5, 6,
            6, 2, 1,
            4, 0, 3,
            3, 7, 4,
            6, 7, 3,
            3, 2, 6,
            4, 5, 1,
            1, 0, 4
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}