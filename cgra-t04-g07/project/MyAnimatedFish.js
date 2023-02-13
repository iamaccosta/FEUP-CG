import {CGFobject} from "../lib/CGF.js";
import { MyFish } from "./MyFish.js";

export class MyAnimatedFish extends CGFobject{
    constructor(scene, centro, deltaT, corR, corG, corB, racio) {
        super(scene);
        this.corR = corR;
        this.corG = corG;
        this.corB = corB;
        this.deltaT = deltaT;
        this.center = centro;
        this.racio = racio;
        
        this.vel = 2*5*Math.PI/this.deltaT;
        this.pos = [0, 0, 0];
        this.angle = 0;

        this.fish = new MyFish(this.scene, this.corR, this.corG, this.corB, this.racio);
    }
    update(t){  /*  7.5  */
        this.fish.update(t, 0);
        this.angle += 2*this.vel*Math.PI/180;

        this.pos[0] = this.center[0] - 5*Math.cos(this.angle);
        this.pos[2] = this.center[2] + 5*Math.sin(this.angle);
        this.pos[1]  = this.center[1];
    }
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.fish.display()
        this.scene.popMatrix();
    }
}