import {CGFobject} from '../lib/CGF.js';
import { MyMovingFish } from './MyMovingFish.js';
import { MyPyramid } from "./MyPyramid.js";

/**
* MyMovingObject
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, ori, vel, pos, speedFactor, object) {
        super(scene);
        this.ori = ori;
        this.vel = vel;
        this.pos = pos;
        this.speedFactor = speedFactor;

        this.object = object;

        this.oriy = 0;
        this.prevT = 0;
        this.prevOri = 0;

        this.pyramid = new MyPyramid(this.scene, 5, 1);
        this.movingFish = new MyMovingFish(this.scene, [this.pos[0], this.pos[1], this.pos[2]]);
    }
    update(t){
        this.movingFish.update(t, this.ori, this.prevOri, this.pos);

        if(this.oriy != 0){
            var angle1 = this.oriy*Math.PI/180;
            let delta = (t - this.prevT)/1000;

            if(this.vel > 0){
                if(this.pos[1] <= 8 && this.pos[1] >= -9 ){
                    this.pos[1] += this.vel*delta*Math.sin(angle1);
                }
                else if((this.pos[1] > 8 && this.oriy < 0) || (this.pos[1] < -9 && this.oriy > 0)){
                    this.pos[1] += this.vel*delta*Math.sin(angle1);
                }
                else if(this.pos[1] > 8 || this.pos[1] < -9)
                    this.oriy = 0;

                var angle = this.ori*Math.PI/180;
                this.pos[0] += this.vel * this.speedFactor*delta*Math.sin(angle);
                this.pos[2] += this.vel * this.speedFactor*delta*Math.cos(angle);
            }
            
        }
        else{
            if(this.vel > 0){
                var angle = this.ori*Math.PI/180;
                let delta = (t - this.prevT)/1000;
                this.pos[0] += this.vel * this.speedFactor*delta*Math.sin(angle);
                this.pos[2] += this.vel * this.speedFactor*delta*Math.cos(angle);
            }
        }

        this.prevT = t;
        this.prevOri = this.ori;
    }
    check_y(){
        if(this.pos[1] < -9)
            return this.pos
        else    
            return [0,0,0];
    }
    display(){
        var angle = this.ori*Math.PI/180;

        // Pyramid
        if(this.object == 0){
            this.scene.pushMatrix();
            this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
            this.scene.rotate(angle, 0, 1, 0);
            this.pyramid.display();
            this.scene.popMatrix();
        }
        else{ // Moving Fish
            this.scene.pushMatrix();
            this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
            this.scene.rotate(angle, 0, 1, 0);
            this.movingFish.display();
            this.scene.popMatrix();
        }

    }
    turn(ori){
        this.ori += ori;
    }
    turny(oriy){
        this.oriy += oriy;
    }
    accelerate(vel){
        if(this.vel > 0){
            this.vel += vel;
        }
        else if(this.vel == 0 && vel > 0){
            this.vel += vel;
        }
    }
    reset(){
        this.ori = 0;
        this.vel = 0;
        this.pos = [0, 0, 0];
    }
}