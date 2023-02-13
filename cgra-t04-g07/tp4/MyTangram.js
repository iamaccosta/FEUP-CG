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
        this.triangleSmall = new MyTriangleSmall(this.scene, 0);
        this.triangleSmall1 = new MyTriangleSmall(this.scene, 1);
        this.triangleBig = new MyTriangleBig(this.scene, 0);
        this.triangleBig1 = new MyTriangleBig(this.scene, 1);
        this.initMaterials();
    }
    initMaterials(){
        //TangramImages
        this.tangramMaterial = new CGFappearance(this.scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram-lines.png');
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //Diamond
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.diamondMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.diamondMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.diamondMaterial.setShininess(10.0);
        //Triangle
        this.triangleMaterial = new CGFappearance(this.scene);
        this.triangleMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.triangleMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.triangleMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.triangleMaterial.setShininess(10.0);
        //TriangleSmall
        this.triangleSmallMaterial = new CGFappearance(this.scene);
        this.triangleSmallMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.triangleSmallMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.triangleSmallMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.triangleSmallMaterial.setShininess(10.0);
        //TriangleSmall1
        this.triangleSmall1Material = new CGFappearance(this.scene);
        this.triangleSmall1Material.setAmbient(0.1, 0.1, 0.1, 1);
        this.triangleSmall1Material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.triangleSmall1Material.setSpecular(0.9, 0.9, 0.9, 1);
        this.triangleSmall1Material.setShininess(10.0);
        //TriangleBig
        this.triangleBigMaterial = new CGFappearance(this.scene);
        this.triangleBigMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.triangleBigMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.triangleBigMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.triangleBigMaterial.setShininess(10.0);
        //TriangleBig1
        this.triangleBig1Material = new CGFappearance(this.scene);
        this.triangleBig1Material.setAmbient(0.1, 0.1, 0.1, 1);
        this.triangleBig1Material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.triangleBig1Material.setSpecular(0.9, 0.9, 0.9, 1);
        this.triangleBig1Material.setShininess(10.0);
        //Parallelogram
        this.parallelogramMaterial = new CGFappearance(this.scene);
        this.parallelogramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.parallelogramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.parallelogramMaterial.setSpecular(0.9, 0.9, 0.9, 1);
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
        this.tangramMaterial.apply();
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
        this.tangramMaterial.apply();
        this.scene.translate(2, -Math.sqrt(2), 0);
        this.scene.multMatrix(rotateMatrix);
        this.triangle.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.tangramMaterial.apply();
        this.scene.translate(1, 0, 0);
        this.triangleSmall1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.tangramMaterial.apply();
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
        this.tangramMaterial.apply();
        this.scene.multMatrix(rotateMatrix);
        this.triangleBig1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.tangramMaterial.apply();
        this.scene.translate(-2, 0, 0);
        this.triangleBig.display();
        this.scene.popMatrix();


        var angle = Math.PI;
        var rotateMatrix = [
            1, 0, 0, 0,
            0, Math.cos(angle), Math.sin(angle), 0,
            0, -Math.sin(angle), Math.cos(angle), 0,
            0, 0, 0, 1
        ];


        this.scene.pushMatrix();
        this.tangramMaterial.apply();
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
