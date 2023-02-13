import { CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";

/**
 * MyWaterSurface
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWaterSurface extends CGFobject {
    constructor(scene, divisoes, comprimento, largura, alturaMax) {
        super(scene);
        this.divisoes = divisoes;
        this.comprimento = comprimento;
        this.largura = largura;
        this.alturaMax = alturaMax;

        this.plane = new MyPlane(this.scene, this.divisoes, 0, 1, 0, 1);

        this.waterShader = new CGFshader(this.scene.gl, "shaders/waterSurface.vert", "shaders/waterSurface.frag");

        this.initMaterials();
    }
    initMaterials(){

        // Materials and textures initialization
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);
        this.appearance.loadTexture("images/project_partB/pier.jpg");

        this.texture2 = new CGFtexture(this.scene, "images/project_partB/distortionMap.png");
        this.waterShader.setUniformsValues({uSampler2: 1, distortionMap: 2});

    }
    update(t){
        this.waterShader.setUniformsValues({ timeFactor: t / 100 % 100 });
    }
    display(){
        //surface
        this.appearance.apply();
        this.scene.setActiveShader(this.waterShader);

        this.scene.pushMatrix();
        this.texture2.bind(2);
        this.scene.scale(50, -50, -50);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}