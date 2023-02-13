import {CGFobject} from "../lib/CGF.js";
import { MyFish } from "./MyFish.js";

export class MyMovingFish extends CGFobject{
    constructor(scene) {
        super(scene);
        
        this.aux = 0;

        this.fish = new MyFish(this.scene, 1, 1, 51/255);
    }
    update(t, ori, prevOri){    // dá update às barbatanas perante o movimento do peixe
        
        if(ori - prevOri == 0){
            this.aux = 0;
            this.fish.update(t, this.aux);
        }
        else{
            if(ori < 0){
                if(ori - prevOri < 0){
                    this.aux = 1;
                    this.fish.update(t, this.aux);
                }
                else if(ori - prevOri > 0){
                    this.aux = -1;
                    this.fish.update(t, this.aux);
                }
                else
                    this.fish.update(t, this.aux); 
            }
            else if(ori > 0){
    
                if(ori - prevOri < 0){
                    this.aux = 1;
                    this.fish.update(t, this.aux);
                }
                else if(ori - prevOri > 0){
                    this.aux = -1;
                    this.fish.update(t, this.aux);
                }
                else
                    this.fish.update(t, this.aux); 
            }
            else
                this.fish.update(t, this.aux); 
        }
    }
    display(){
        this.scene.pushMatrix();
        this.fish.display();
        this.scene.popMatrix();
    }
}