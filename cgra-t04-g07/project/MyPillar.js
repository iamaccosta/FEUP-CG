import {CGFappearance, CGFobject} from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyPillar extends CGFobject{
    constructor(scene) {
        super(scene);
        
        this.pillar = new MyCylinder(this.scene, 16);

        this.initMaterials();
    }
    initMaterials(){
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);
        this.appearance.loadTexture("images/pillar.jpg");
    }
    display() {
        this.appearance.apply();

        this.scene.pushMatrix();
        this.scene.translate(2.5, 0, -4);
        this.scene.scale(0.5, 10, 0.5);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.5, 0, 0);
        this.scene.scale(0.5, 10, 0.5);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(25, 0, -4);
        this.scene.scale(0.5, 10, 0.5);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(25, 0, 0);
        this.scene.scale(0.5, 10, 0.5);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(12.5, 0, -4);
        this.scene.scale(0.5, 10, 0.5);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(12.5, 0, 0);
        this.scene.scale(0.5, 10, 0.5);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.defaultAppearance.apply();
    }
}