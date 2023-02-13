import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyQuad } from "./MyQuad.js";
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.diamond = new MyDiamond(this);
        this.triangle = new MyTriangle(this);
        this.parallelogram = new MyParallelogram(this);
        this.triangleSmall = new MyTriangleSmall(this);
        this.triangleBig = new MyTriangleBig(this);
        this.tangram = new MyTangram(this);
        this.unitCube = new MyUnitCube(this);
        this.unitCubeQuad = new MyUnitCubeQuad(this);
        this.quad = new MyQuad(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayDiamond = true;
        this.displayTriangle = true;
        this.displayParallelogram = true;
        this.displayTriangleSmall = true;
        this.displayTriangleBig = true;
        this.displayQuad = true;
        this.displayUnitCube = true;
        this.displayUnitCubeQuad = true;
        this.displayTangram = true;
        this.scaleFactor = 1;

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(
            0.4,
            0.1,
            500,
            vec3.fromValues(15, 15, 15),
            vec3.fromValues(0, 0, 0)
        );
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis, triangles, diamond and parallelogram
        if (this.displayAxis) this.axis.display();

        this.setDefaultAppearance();

        var sca = [
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
        ];

        this.multMatrix(sca);

        var translateCube = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.5, 0.5, -0.5, 1
            ];

        var escCube = [
            8, 0, 0, 0,
            0, 6, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
            ];

        var translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -4, -3.5, 0, 1
            ];

        //5
        var rotateImage = [
            1, 0, 0, 0,
            0, Math.cos(Math.PI/2), -Math.sin(Math.PI/2), 0,
            0, -Math.sin(Math.PI/2), Math.cos(Math.PI/2), 0,
            0, 0, 0, 1
        ];

        //5
        var translateXY = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            4, -1, 2.5, 1
            ];

        this.pushMatrix();
        this.multMatrix(translateXY);
        this.multMatrix(rotateImage);
        this.multMatrix(translate);
        this.multMatrix(escCube);
        this.multMatrix(translateCube);
        if (this.displayUnitCube) this.unitCube.display();
        this.popMatrix();


        var translateTangram = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            4.25, -2.5, 0, 1
            ];

        this.pushMatrix();
        this.multMatrix(rotateImage);
        this.multMatrix(translateTangram);
        if (this.displayTangram) this.tangram.display();
        this.popMatrix();

        var angle = -Math.PI/2;
        var mrotate = [
            1, 0, 0, 0,
            0, Math.cos(angle), Math.sin(angle), 0,
            0, -Math.sin(angle), Math.cos(angle), 0,
            0, 0, 0, 1
        ];

        var scale = [
            8, 0, 0, 0,
            0, 6, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        var m3 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -1, 0, 1
        ];

        this.pushMatrix();
        this.multMatrix(m3);
        this.multMatrix(mrotate);
        this.multMatrix(scale);
        if (this.displayUnitCubeQuad) this.unitCubeQuad.display();
        this.popMatrix();
    }
}
