import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);

        //Initialize scene objects
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);

        /*
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayDiamond = true;
        this.displayTriangle = true;
        this.displayParallelogram = true;
        this.displayTriangleSmall = true;
        this.displayTriangleBig = true;
        this.scaleFactor = 1;
        */
    }
    display() {
        var translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 1, 0, 1
            ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translate);
        this.diamond.display();
        this.scene.popMatrix();

        var ang = 125 * Math.PI / 100;
        var rotate = [
            Math.cos(ang), Math.sin(ang), 0, 0,
            -Math.sin(ang), Math.cos(ang), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
            ];

        var translate1 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            2, -Math.sqrt(2), 0, 1
            ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translate1);
        this.scene.multMatrix(rotate);
        this.triangle.display();
        this.scene.popMatrix();

        var translate2 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            1, 0, 0, 1
            ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translate2);
        this.triangleSmall.display();
        this.scene.popMatrix();

        var translate3 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -3, 0, 1
            ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translate3);
        this.triangleSmall.display();
        this.scene.popMatrix();

        var rotate1 = [
            Math.cos(Math.PI), Math.sin(Math.PI), 0, 0,
            -Math.sin(Math.PI), Math.cos(Math.PI), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
            ];

        this.scene.pushMatrix();
        this.scene.multMatrix(rotate1);
        this.triangleBig.display();
        this.scene.popMatrix();

        var translate4 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -2, 0, 0, 1
            ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translate4);
        this.triangleBig.display();
        this.scene.popMatrix();

        var rotate2 = [
            1, 0, 0, 0,
            0, Math.cos(Math.PI), Math.sin(Math.PI), 0,
            0, -Math.sin(Math.PI), Math.cos(Math.PI), 0,
            0, 0, 0, 1
            ];

        var translate5 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.58, -Math.sqrt(2), 0, 1
            ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translate5);
        this.scene.multMatrix(rotate2);
        this.parallelogram.display();
        this.scene.popMatrix();
    }
}