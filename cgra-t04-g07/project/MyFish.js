import {CGFobject, CGFappearance, CGFshader} from '../lib/CGF.js';
import {MyTriangle} from "./MyTriangle.js";
import {MySphere} from "./MySphere.js";
/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyFish extends CGFobject {
    constructor(scene, corR, corG, corB, racio) {
        super(scene);
        this.corR = corR;
        this.corG = corG;
        this.corB = corB;
        this.racio = racio;
        this.triangle = new MyTriangle(this.scene);
        this.sphere = new MySphere(this.scene, 16, 8);
        this.angle = 0;
        
        this.bodyShader = new CGFshader(this.scene.gl, "shaders/fish.vert", "shaders/fish.frag");

        this.initMaterials();
    }
    initMaterials(){
        this.barbatanaMaterial = new CGFappearance(this.scene);
        this.barbatanaMaterial.setAmbient(this.corR, this.corG, this.corB, 1);
        this.barbatanaMaterial.setDiffuse(this.corR, this.corG, this.corB, 1);
        this.barbatanaMaterial.setSpecular(this.corR, this.corG, this.corB, 1);
        this.barbatanaMaterial.setEmission(this.corR, this.corG, this.corB, 1);
        this.barbatanaMaterial.setShininess(10.0);

        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(0.8, 0.8, 0.8, 1);
        this.bodyMaterial.setDiffuse(0.8, 0.8, 0.8, 1);
        this.bodyMaterial.setSpecular(0.8, 0.8, 0.8, 1);
        this.bodyMaterial.setShininess(10.0);
        this.bodyMaterial.setEmission(0.5, 0.5, 0.5, 1);
        this.bodyMaterial.loadTexture('images/fishBody.jpg');

        this.olhosMaterial = new CGFappearance(this.scene);
        this.olhosMaterial.setAmbient(0.8, 0.8, 0.8, 1);
        this.olhosMaterial.setDiffuse(0.8, 0.8, 0.8, 1);
        this.olhosMaterial.setSpecular(0.8, 0.8, 0.8, 1);
        this.olhosMaterial.setShininess(10.0);
        this.olhosMaterial.setEmission(1, 1, 1, 1);
        this.olhosMaterial.loadTexture('images/olhos.jpg');

        this.bodyShader.setUniformsValues({partR: this.corR, partG: this.corG, partB: this.corB, racio: this.racio}); 
    }
    update(t, aux){
        
        if(aux == 1){
            this.angle = Math.sin(t/100)*0.1;

            this.angle1 = Math.cos(t/50)*0.1;

            this.angle2 = 0;
        }
        else if(aux == -1){
            this.angle = Math.sin(t/100)*0.1;

            this.angle1 = 0;

            this.angle2 = Math.cos(t/50)*0.1;
        }
        else{
            this.angle = Math.sin(t/100)*0.1;

            this.angle1 = Math.cos(t/200)*0.1;

            this.angle2 = Math.cos(t/200)*0.1;
        }
    }
    display(){
        this.scene.pushMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.translate(-1.75, 1.5, 3);
        this.olhosMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.translate(1.75, 1.5, 3);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.olhosMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        //Body
        this.scene.pushMatrix();
        this.bodyMaterial.apply();
        this.scene.setActiveShader(this.bodyShader);
        this.scene.scale(0.5, 0.8, 1.2);
        this.sphere.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();


        //Barbatana dorsal
        this.scene.pushMatrix();
        this.barbatanaMaterial.apply();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.translate(0, 4, 0.3);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.triangle.display();
        this.scene.popMatrix();

        //Cauda
        this.scene.pushMatrix();
        this.barbatanaMaterial.apply();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(0, 0, -2.5);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.translate(0,0,-1.33);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();


        //Barbatanas Laterais
        this.scene.pushMatrix();
        this.barbatanaMaterial.apply();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.translate(1.5, -2, -0.75);
        this.scene.rotate(this.angle1, 0, 0, 1);
        this.scene.translate(0.8,0,0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.barbatanaMaterial.apply();
        this.scene.scale(-0.25, 0.25, 0.25);
        this.scene.translate(1.5, -2, -0.75);
        this.scene.rotate(this.angle2, 0, 0, 1);
        this.scene.translate(0.8,0,0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }  
}