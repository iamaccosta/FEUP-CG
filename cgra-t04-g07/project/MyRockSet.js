import {CGFobject, CGFappearance} from "../lib/CGF.js";
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject{
    constructor(scene, nrPedras) {
        super(scene);
        this.nrPedras = nrPedras;

        var rocks = [];
        for(let i = 0; i < nrPedras; i++){
            rocks.push(new MyRock(this.scene, 16, 8));
        }
        this.rocks = rocks;

        //Rock Appearance
        this.rockAppearance = new CGFappearance(this.scene);
        this.rockAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.rockAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.rockAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.rockAppearance.setShininess(120);
        this.rockAppearance.loadTexture("images/project_partB/grey_rock.jpg");

        this.randx = this.get_random();
        this.randz = this.get_random();
        this.y = 0.5;
    }
    get_ramdom_ninho_z(){ // random posição dentro do ninho ( 7.3 )
        return Math.floor(Math.random()*(2.5) + (-10.0)).toFixed(2);
    }
    update_vector(pos, pos1){   //muda a posição da pedra quando entra no raio ninho
        if(this.distance(pos[0]/4, 0.5, pos[2]/4, pos1[0], 0.5, pos1[2]) > 1.5){
            this.pos = pos;
            this.pos1 = pos1;
        }
        else{
            this.pos1[0] = -2;
            this.pos1[1] = 0.5;
            this.pos1[2] = this.get_ramdom_ninho_z();

            this.pos = [this.pos1[0]*4, 0.5, this.pos1[2]*4];
        }
    }
    get_random(){   // posiçao random da pedra entre -25 e 25
        var pos = [];
        for(let i = 0; i < this.nrPedras; i++){
            pos.push(Math.floor(Math.random()*(50))+(-25));
        }
        return pos;
    }
    distance(x1 , y1 , z1 , x2 , y2 , z2) {
 
        var d = Math.sqrt((Math.pow(x2 - x1, 2) +
                Math.pow(y2 - y1, 2) +
                Math.pow(z2 - z1, 2)));
        return d;
    }
    check_distance(posit){
        var prox = [this.randx[0], 0.5, this.randz[0]];
        var d1 = this.distance(posit[0]/4, 0.5, posit[2]/4, prox[0], 0.5, prox[2]);

        this.k = null;
        for(let i = 1; i < this.nrPedras; i++){
            var d2 = this.distance(posit[0]/4, 0.5, posit[2]/4, this.randx[i], 0.5, this.randz[i]);

            if(d2 < d1 && d2 < 1){    // muda a pedra mais proxima, caso esteja a uma distancia menor do que 1
                prox = [this.randx[i], 0.5, this.randz[i]];
                d1 = this.distance(posit[0]/4, 0.5, posit[2]/4, prox[0], 0.5, prox[2]);
                this.k = i;
            }
        }
        console.log(this.k);
        return 1;
    }
    display(){
        this.scene.defaultAppearance.apply();

        this.rockAppearance.apply();

        for(let i = 0; i < this.nrPedras; i++){
            this.y = 0.5;
            if(i == this.k){
                this.randx[i] = this.pos[0]/4;
                this.randz[i] = this.pos[2]/4;
                this.y = this.pos1[1];
                console.log(this.randx[i], this.y, this.randz[i]);
            }
            if(this.randx[i] == -2 && this.randz[i] == -9)
                this.y = 0.5;
            this.scene.pushMatrix();
            this.scene.translate(this.randx[i], this.y, this.randz[i]);
            this.scene.scale(0.15, 0.15, 0.15);
            this.rocks[i].display();
            this.scene.popMatrix();
        }

        this.scene.defaultAppearance.apply();
    }
}