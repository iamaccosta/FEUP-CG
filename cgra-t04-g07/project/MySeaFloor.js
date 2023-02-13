import { CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";
import { MyPyramid } from './MyPyramid.js';
import { MySphere } from './MySphere.js';

/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySeaFloor extends CGFobject {
    constructor(scene, divisoes, comprimento, largura, alturaMax) {
        super(scene);
        this.divisoes = divisoes;
        this.comprimento = comprimento;
        this.largura = largura;
        this.alturaMax = alturaMax;

        //floor
        this.plane = new MyPlane(this.scene, this.divisoes, 0, 1, 0, 1);
        //algas
        this.alga = new MyPyramid(this.scene, 32, 8);

        this.sandShader = new CGFshader(this.scene.gl, "shaders/sand.vert", "shaders/sand.frag");

        this.initMaterials();

        /*      7.1      */
        this.randx = this.get_random();
        this.randy = this.get_random_y();
        this.randz = this.get_random();

        this.corR = this.get_random_color();
        this.corG = this.get_random_color();
        this.corB = this.get_random_color();

        this.leafs = this.get_random_leafs();

        this.slidex = this.get_random_slide(3);
        this.slidez = this.get_random_slide(3);
        
    }
    initMaterials(){
        this.scene.enableTextures(true);

        // Materials and textures initialization
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);

        this.texture = new CGFtexture(this.scene, "images/project_partB/sand.png");
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.texture2 = new CGFtexture(this.scene, "images/project_partB/sandMap.png");
        this.sandShader.setUniformsValues({uSampler2: 1, sandMap: 1});

        //alga appearance
        this.algaAppearance = new CGFappearance(this.scene);

        //ninho appearance
        this.ninhoAppearance = new CGFappearance(this.scene);
        this.ninhoAppearance.setAmbient(28/255, 108/255, 28/255, 1);
        this.ninhoAppearance.setDiffuse(28/255, 108/255, 28/255, 1);
        this.ninhoAppearance.setSpecular(28/255, 108/255, 28/255, 1);
        this.ninhoAppearance.setShininess(120);
    }

    /*      7.1      */

    change_material(i){ // random verde das algas
        this.algaAppearance.setAmbient(this.corR[i] /50, this.corG[i], this.corB[i] /60, 1);
        this.algaAppearance.setDiffuse(this.corR[i] /50, this.corG[i], this.corB[i] /60, 1);
        this.algaAppearance.setSpecular(this.corR[i] /100, this.corG[i], this.corB[i] /100, 1);

        this.algaAppearance.setShininess(120);
    }
    get_random(){   // random posição das algas
        var pos = [];
        for(let i = 0; i < 75; i++){
            pos.push(Math.floor(Math.random()*(50)+(-25)));
        }
        return pos;
    }
    get_random_y(){ //random altura das algas
        var pos = [];
        for(let i = 0; i < 3*75; i++){
            pos.push(Math.random()*(1.5-1)+1).toFixed(2);
        }
        return pos;
    }
    get_random_color(){
        var cor = [];
        for(let i = 0; i < 75; i++){
            cor.push(Math.floor(Math.random()*2) + 0.3);
        }
        return cor;
    }
    get_random_leafs(){   // numero random de folhas 
        var leaf = [];
        for(let i = 0; i < 75; i++){
            leaf.push(Math.floor(Math.random()*3)+1);
        }
        return leaf;
    }
    get_random_slide(k){    // numero random de posições entre o numero de folhas
        let pos = [];
        for(let i = 0; i < k*75; i++){
            pos.push(Math.random()*(0.6)+(-0.15)).toFixed(2);
        }
        return pos;
    }
    ninho_pos(){
        return [-2, 0.9, -9];
    }
    display(){
        //floor
        this.appearance.apply();
        this.scene.setActiveShader(this.sandShader);
        
        this.scene.pushMatrix();
        this.texture2.bind(1);
        this.scene.scale(50, 50, 50);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

        //algas
        let t = 0;
        for(var i = 0; i < 75; i++){
            this.change_material(i);
            this.algaAppearance.apply();

            for(var k = 0; k < this.leafs[i]; k++){
                
                this.scene.pushMatrix();
                this.scene.translate(this.slidex[t], 0, this.slidez[t]);
                this.scene.translate(this.randx[i], 1, this.randz[i]);
                this.scene.scale(0.25, this.randy[t], 0.15);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.alga.display();
                this.scene.popMatrix();

                t++;
            }
        }
       
        //ninho do peixe
        this.ninhoAppearance.apply();

        this.scene.pushMatrix();
        this.scene.scale(1, 3, 1);
        this.scene.translate(-3, 0.5, -10.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 2.5, 1);
        this.scene.translate(-3, 0.5, -10);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);
        this.scene.translate(-3, 0.5, -9.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 1.5, 1);
        this.scene.translate(-3, 0.5, -9);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 2.5, 1);
        this.scene.translate(-2.5, 0.5, -10.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 3, 1);
        this.scene.translate(-2, 0.5, -10.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 2.5, 1);
        this.scene.translate(-1.5, 0.5, -10.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 3, 1);
        this.scene.translate(-1, 0.5, -10.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 2.5, 1);
        this.scene.translate(-1, 0.5, -10);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);
        this.scene.translate(-1, 0.5, -9.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 1.5, 1);
        this.scene.translate(-1, 0.5, -9);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);
        this.scene.translate(-3, 0.5, -8.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 1.5, 1);
        this.scene.translate(-3, 0.5, -8);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);
        this.scene.translate(-1, 0.5, -8.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 1.5, 1);
        this.scene.translate(-1, 0.5, -8);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.alga.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
