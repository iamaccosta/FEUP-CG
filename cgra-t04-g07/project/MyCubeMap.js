import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyCubeMap extends CGFobject {
    constructor(scene, textures) {
        super(scene);
        this.quad = new MyQuad(this.scene);
        this.textures = textures;

        this.selectedMaterial = new CGFappearance(this.scene);
        this.selectedMaterial.setAmbient(0, 0, 0, 0);
        this.selectedMaterial.setDiffuse(0, 0, 0, 0);
        this.selectedMaterial.setSpecular(0, 0, 0, 0);
        this.selectedMaterial.setEmission(1, 1, 1, 1);
        this.selectedMaterial.setShininess(10.0);
        
	}
    updateTextures(texture){
        this.textures = texture;
    }
    display(){

        this.scene.translate(this.scene.camera.position[0],this.scene.camera.position[1], this.scene.camera.position[2]);

        this.scene.scale(50, 50, 50);
        this.selectedMaterial.setTexture(this.textures/*[this.selectedMaterial]*/[3]);
        this.selectedMaterial.apply();
        this.scene.translate(0, -0.5, 0);
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();
        
        
        this.selectedMaterial.setTexture(this.textures/*[this.selectedMaterial]*/[1]);
        this.selectedMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.5);
        this.quad.display();
        this.scene.popMatrix();


        this.selectedMaterial.setTexture(this.textures/*[this.selectedMaterial]*/[0]);
        this.selectedMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0.5);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();


        this.selectedMaterial.setTexture(this.textures/*[this.selectedMaterial]*/[2]);
        this.selectedMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();


        this.selectedMaterial.setTexture(this.textures/*[this.selectedMaterial]*/[4]);
        this.selectedMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();


        this.selectedMaterial.setTexture(this.textures/*[this.selectedMaterial]*/[5]);
        this.selectedMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
    }
}