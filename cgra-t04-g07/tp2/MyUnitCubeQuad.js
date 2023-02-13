import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);

        this.quad = new MyQuad(this.scene);
    }

    display(){
        var translateMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.5, 0, 0.5, 1
        ];

        this.scene.multMatrix(translateMatrix);
        this.quad.display();

        var angle = Math.PI/2;
        var rotateMatrix = [
            1, 0, 0, 0,
            0, Math.cos(angle), Math.sin(angle), 0,
            0, -Math.sin(angle), Math.cos(angle), 0,
            0, 0, 0, 1
        ];

        translateMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -0.5, 0.5, 1
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix);
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

        translateMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -0.5, -0.5, 1
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix);
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

        translateMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -1, 0, 1
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix);
        this.scene.multMatrix(rotateMatrix);
        this.quad.display();
        this.scene.popMatrix();

        angle = Math.PI/2;
        rotateMatrix = [
            Math.cos(angle), Math.sin(angle), 0, 0,
            -Math.sin(angle), Math.cos(angle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        translateMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -0.5, -0.5, 0, 1
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix);
        this.scene.multMatrix(rotateMatrix);
        this.quad.display();
        this.scene.popMatrix();

        angle = -Math.PI/2;
        rotateMatrix = [
            Math.cos(angle), Math.sin(angle), 0, 0,
            -Math.sin(angle), Math.cos(angle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        translateMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.5, -0.5, 0, 1
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix);
        this.scene.multMatrix(rotateMatrix);
        this.quad.display();
        this.scene.popMatrix();
    }
}