import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);

        this.quad = new MyQuad(this.scene);

        this.texTopo = new CGFtexture(this.scene, 'images/mineTop.png');
        this.texFundo = new CGFtexture(this.scene, 'images/mineBottom.png');
        this.texSide = new CGFtexture(this.scene, 'images/mineSide.png');
    }
    display(){
        this.scene.pushMatrix();
        this.texSide.bind();
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        var angle = Math.PI/2;
        var rotateMatrix = [
            1, 0, 0, 0,
            0, Math.cos(angle), Math.sin(angle), 0,
            0, -Math.sin(angle), Math.cos(angle), 0,
            0, 0, 0, 1
        ];

        this.scene.pushMatrix();
        this.texFundo.bind();
        this.scene.translate(0,-0.5,0);
        this.scene.multMatrix(rotateMatrix);
        this.quad.display();
        this.scene.popMatrix();

        angle = Math.PI;
        rotateMatrix = [
            1, 0, 0, 0,
            0, Math.cos(angle), Math.sin(angle), 0,
            0, -Math.sin(angle), Math.cos(angle), 0,
            0, 0, 0, 1
        ];

        var rotateMatrix1 = [
            Math.cos(angle), Math.sin(angle), 0, 0,
            -Math.sin(angle), Math.cos(angle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]

        this.scene.pushMatrix();
        this.texSide.bind();
        this.scene.multMatrix(rotateMatrix1);
        this.scene.translate(0,0,-0.5);
        this.scene.multMatrix(rotateMatrix);
        this.quad.display();
        this.scene.popMatrix();

        angle = -Math.PI/2;
        rotateMatrix = [
            1, 0, 0, 0,
            0, Math.cos(angle), Math.sin(angle), 0,
            0, -Math.sin(angle), Math.cos(angle), 0,
            0, 0, 0, 1
        ];

        this.scene.pushMatrix();
        this.texTopo.bind();
        this.scene.translate(0,0.5,0);
        this.scene.multMatrix(rotateMatrix);
        this.quad.display();
        this.scene.popMatrix();

        angle = Math.PI/2;
        rotateMatrix = [
            Math.cos(angle), 0, Math.sin(angle), 0,
            0, 1, 0, 0,
            -Math.sin(angle), 0, Math.cos(angle), 0,
            0, 0, 0, 1
        ];

        this.scene.pushMatrix();
        this.texSide.bind();
        this.scene.translate(-0.5,0,0);
        this.scene.multMatrix(rotateMatrix);
        this.quad.display();
        this.scene.popMatrix();

        angle = -Math.PI/2;
        rotateMatrix = [
            Math.cos(angle), 0, Math.sin(angle), 0,
            0, 1, 0, 0,
            -Math.sin(angle), 0, Math.cos(angle), 0,
            0, 0, 0, 1
        ];

        this.scene.pushMatrix();
        this.texSide.bind();
        this.scene.translate(0.5,0,0);
        this.scene.multMatrix(rotateMatrix);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    }
}
