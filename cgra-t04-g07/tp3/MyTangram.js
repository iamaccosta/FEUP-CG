import { CGFobject, CGFappearance } from '../lib/CGF.js';
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
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.initMaterials();

    }
    initMaterials(){
        //Diamond
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0, 1, 0, 1.0);
        this.diamondMaterial.setDiffuse(0, 1.0/2.5, 0, 1.0);
        this.diamondMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.diamondMaterial.setShininess(10.0);

        //Triangle
        this.triangleMaterial = new CGFappearance(this.scene);
        this.triangleMaterial.setAmbient(1, 192/255, 203/255, 1.0);
        this.triangleMaterial.setDiffuse(1, 192/255, 203/255, 1.0);
        this.triangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleMaterial.setShininess(10.0);

        //TriangleSmall
        this.triangleSmallMaterial = new CGFappearance(this.scene);
        this.triangleSmallMaterial.setAmbient(1, 0, 0, 1.0);
        this.triangleSmallMaterial.setDiffuse(1, 0, 0, 1);
        this.triangleSmallMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleSmallMaterial.setShininess(10.0);

        //TriangleSmall1
        this.triangleSmall1Material = new CGFappearance(this.scene);
        this.triangleSmall1Material.setAmbient(153/255, 50/255, 204/255, 1.0);
        this.triangleSmall1Material.setDiffuse(153/255, 50/255, 204/255, 1.0);
        this.triangleSmall1Material.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleSmall1Material.setShininess(10.0);

        //TriangleBig
        this.triangleBigMaterial = new CGFappearance(this.scene);
        this.triangleBigMaterial.setAmbient(1, 165.0/255.0, 0, 1.0);
        this.triangleBigMaterial.setDiffuse(1, 165.0/255.0, 0, 1.0);
        this.triangleBigMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleBigMaterial.setShininess(10.0);

        //TriangleBig1
        this.triangleBig1Material = new CGFappearance(this.scene);
        this.triangleBig1Material.setAmbient(0, 191/255, 1, 1.0);
        this.triangleBig1Material.setDiffuse(0, 191/255, 1, 1);
        this.triangleBig1Material.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleBig1Material.setShininess(10.0);

        //Parallelogram
        this.parallelogramMaterial = new CGFappearance(this.scene);
        this.parallelogramMaterial.setAmbient(1, 1, 0, 1.0);
        this.parallelogramMaterial.setDiffuse(1, 1, 0, 1.0);
        this.parallelogramMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.parallelogramMaterial.setShininess(10.0);
    }
    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.triangleBig.enableNormalViz();
    }
    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.triangleBig.disableNormalViz();
    }
    display(){
        this.scene.pushMatrix();
        this.diamondMaterial.apply();
        this.scene.translate(0, 1, 0);
        this.diamond.display();
        this.scene.popMatrix();

        var angle = 125*Math.PI/100;
        var rotateMatrix = [
            Math.cos(angle), Math.sin(angle), 0, 0,
            -Math.sin(angle), Math.cos(angle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        this.scene.pushMatrix();
        this.triangleMaterial.apply();
        this.scene.translate(2, -Math.sqrt(2), 0);
        this.scene.multMatrix(rotateMatrix);
        this.triangle.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.triangleSmall1Material.apply();
        this.scene.translate(1, 0, 0);
        this.triangleSmall.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.triangleSmallMaterial.apply();
        this.scene.translate(0, -3, 0);
        this.triangleSmall.display();
        this.scene.popMatrix();

        angle = 100*Math.PI/100;
        rotateMatrix = [
            Math.cos(angle), Math.sin(angle), 0, 0,
            -Math.sin(angle), Math.cos(angle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        this.scene.pushMatrix();
        this.triangleBig1Material.apply();
        this.scene.multMatrix(rotateMatrix);
        this.triangleBig.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.triangleBigMaterial.apply();
        this.scene.translate(-2, 0, 0);
        this.triangleBig.display();
        this.scene.popMatrix();


        angle = 100*Math.PI/100;
        rotateMatrix = [
            1, 0, 0, 0,
            0, Math.cos(angle), Math.sin(angle), 0,
            0, -Math.sin(angle), Math.cos(angle), 0,
            0, 0, 0, 1
        ];

        this.scene.pushMatrix();
        this.parallelogramMaterial.apply();
        this.scene.translate(0.58, -Math.sqrt(2), 0);
        this.scene.multMatrix(rotateMatrix);
        this.parallelogram.display();
        this.scene.popMatrix();

    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of nDivs
     */
    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}