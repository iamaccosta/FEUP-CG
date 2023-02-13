import {CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MySeaFloor } from "./MySeaFloor.js";
import {MyWaterSurface} from "./MyWaterSurface.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPillar } from "./MyPillar.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MyAnimatedFish } from "./MyAnimatedFish.js";

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

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.sphereAppearance.setEmission(1, 1, 1, 1);
		this.sphereAppearance.setShininess(120);
        this.sphereAppearance.loadTexture('images/earth.jpg');

        //Test
        this.testBack = new CGFtexture(this, 'images/test_cubemap/pz.png');
        this.testFront = new CGFtexture(this, 'images/test_cubemap/nz.png');
        this.testTop = new CGFtexture(this, 'images/test_cubemap/py.png');
        this.testBottom = new CGFtexture(this, 'images/test_cubemap/ny.png');
        this.testRight = new CGFtexture(this, 'images/test_cubemap/px.png');
        this.testLeft = new CGFtexture(this, 'images/test_cubemap/nx.png');
        this.testTextures = [this.testBack, this.testFront, this.testTop, this.testBottom, this.testRight, this.testLeft];

        //Demo
        this.demoBack = new CGFtexture(this, 'images/demo_cubemap/back.png');  
        this.demoFront = new CGFtexture(this, 'images/demo_cubemap/front.png');  
        this.demoTop = new CGFtexture(this, 'images/demo_cubemap/top.png');    
        this.demoBottom = new CGFtexture(this, 'images/demo_cubemap/bottom.png');  
        this.demoRight = new CGFtexture(this, 'images/demo_cubemap/right.png');   
        this.demoLeft = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.demoTextures = [this.demoBack, this.demoFront, this.demoTop, this.demoBottom, this.demoRight, this.demoLeft];
                     
        //New Texture
        this.newBack = new CGFtexture(this, 'images/new_cubemap/back.jpg');
        this.newFront = new CGFtexture(this, 'images/new_cubemap/front.jpg');
        this.newTop = new CGFtexture(this, 'images/new_cubemap/top.jpg');
        this.newBottom = new CGFtexture(this, 'images/new_cubemap/bottom.jpg');
        this.newRight = new CGFtexture(this, 'images/new_cubemap/right.jpg');
        this.newLeft = new CGFtexture(this, 'images/new_cubemap/left.jpg');
        this.newTextures = [this.newBack, this.newFront, this.newTop, this.newBottom, this.newRight, this.newLeft];

        //UnderWater
        this.waterBack = new CGFtexture(this, 'images/project_partB/underwater_cubemap/back.jpg');
        this.waterFront = new CGFtexture(this, 'images/project_partB/underwater_cubemap/front.jpg');
        this.waterTop = new CGFtexture(this, 'images/project_partB/underwater_cubemap/top.jpg');
        this.waterBottom = new CGFtexture(this, 'images/project_partB/underwater_cubemap/bottom.jpg');
        this.waterRight = new CGFtexture(this, 'images/project_partB/underwater_cubemap/right.jpg');
        this.waterLeft = new CGFtexture(this, 'images/project_partB/underwater_cubemap/left.jpg');
        this.waterTextures = [this.waterBack, this.waterFront, this.waterTop, this.waterBottom, this.waterRight, this.waterLeft];

        this.textures = [this.testTextures, this.demoTextures, this.newTextures, this.waterTextures];
        this.textureIDs = { 'Test': 0, 'Demo': 1, 'New': 2, 'UnderWater': 3};

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.scaleFactor = 1.0;
        this.speedFactor = 1.0;
        this.selectedTextures = 3;
        this.selectedObject = 0;
        this.displayCubeMap = true;
        this.scaleMObject = 1.0;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this, 0, 0, [0, 0, 0], this.speedFactor, 1);
        this.cubeMap = new MyCubeMap(this, this.textures[this.selectedTextures]);
        this.cylinder = new MyCylinder(this, 32);
        this.seaFloor = new MySeaFloor(this, 20, 5, 5, 1);
        this.waterSurface = new MyWaterSurface(this, 20, 5, 5, 1);
        this.rockSet = new MyRockSet(this, 100);
        this.pillar = new MyPillar(this);
        this.movingFish = new MyMovingFish(this);
        this.animatedFish1 = new MyAnimatedFish(this, [-15, -9, 15], 5, 232/255, 166/255, 33/255, 0.0);
        this.animatedFish2 = new MyAnimatedFish(this, [20, -9, -17.5], 10, 0, 204/255, 102/255, 0.5);

        this.objects = [this.movingObject, this.cylinder, this.incompleteSphere, this.movingFish]

        this.objectIDs = { 'MovingObject': 0, 'Cylinder': 1, 'Sphere': 2, 'MovingFish': 3}

        this.enableTextures(true);

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(1.7, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingObject.update(t);
        this.waterSurface.update(t);
        this.animatedFish1.update(t);
        this.animatedFish2.update(t);
    }
    onSelectedTextureChanged(){
        this.cubeMap.updateTextures(this.textures[this.selectedTextures]);
    }
    checkKeys(){
        var text = "Keys pressed: ";
        var keysPressed = false;

        // Check for key codes e.g. in https://keycode.info/
        if(this.gui.isKeyPressed("KeyW")){
            text += " W ";
            keysPressed = true;
            this.movingObject.accelerate(1);
        }

        if(this.gui.isKeyPressed("KeyS")){
            text += " S ";
            keysPressed = true;
            this.movingObject.accelerate(-1);
        }

        if(this.gui.isKeyPressed("KeyA")){
            text += " A ";
            keysPressed = true;
            this.movingObject.turn(10);
        }

        if(this.gui.isKeyPressed("KeyD")){
            text += " D ";
            keysPressed = true;
            this.movingObject.turn(-10);
        }

        if(this.gui.isKeyPressed("KeyR")){
            text += " R ";
            keysPressed = true;
            this.movingObject.reset();
        }

        if(this.gui.isKeyPressed("KeyP")){
            text += " P ";
            keysPressed = true;
            this.movingObject.turny(25);
        }

        if(this.gui.isKeyPressed("KeyL")){
            text += " L ";
            keysPressed = true;
            this.movingObject.turny(-25);
        }

        if(this.gui.isKeyPressed("KeyC")){
            text += " C ";
            keysPressed = true;
            var pos = this.movingObject.check_y();
            if(pos[1] != 0)
            {
                var aux = this.rockSet.check_distance(pos);
                if(aux == 1){
                    var pos1 = this.seaFloor.ninho_pos();
                    this.rockSet.update_vector(pos, pos1);
                }
            }
        }

        if(keysPressed)
            console.log(text);
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

        this.defaultAppearance.apply();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();
        
        this.defaultAppearance.apply();

        this.pushMatrix();
        this.rockSet.display();
        this.popMatrix();

        this.defaultAppearance.apply();

        this.pushMatrix();
        this.pillar.display();
        this.popMatrix();
        

        // Draw Objects
        this.pushMatrix();
        this.translate(0,3,0); //posição inicial dos objetos

    
        if(this.selectedObject == 0){  // Moving Object (peixe ou piramide dependendo do objeto escolhido a transmitir ao construtor)
            this.pushMatrix();
            this.scale(this.scaleMObject,this.scaleMObject,this.scaleMObject);
            this.scale(0.25,0.25,0.25);
            this.objects[0].display();
            this.popMatrix();
        }
        else if(this.selectedObject == 1){  //Cylinder
            if (this.displayNormals)
                this.objects[this.selectedObject].enableNormalViz();
            else
                this.objects[this.selectedObject].disableNormalViz();
            
            this.pushMatrix();
            this.sphereAppearance.apply();
            this.objects[1].display();
            this.popMatrix();
        }
        else if(this.selectedObject == 2){  //sphere
            this.pushMatrix();
            this.sphereAppearance.apply();
            this.objects[2].display();
            this.popMatrix();
        }   
        else if(this.selectedObject == 3){  //fish sem as movimentações
            this.pushMatrix();
            this.scale(0.25,0.25,0.25);
            this.objects[3].display();
            this.popMatrix();
        }

        //Animated fishes

        this.pushMatrix();
        this.scale(0.25, 0.25, 0.25);
        this.animatedFish1.display();
        this.popMatrix();

        this.pushMatrix();
        this.scale(0.25, 0.25, 0.25);
        this.animatedFish2.display();
        this.popMatrix();

        this.popMatrix(); //pop do translate (0,3,0)

        //fundo do mar e surface
        this.pushMatrix();
        this.translate(0, -0.5, 0);
        this.seaFloor.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(0, 10, 0);
        this.waterSurface.display();
        this.popMatrix();

        if(this.displayCubeMap) {
            this.cubeMap.display();
        }

    }
}