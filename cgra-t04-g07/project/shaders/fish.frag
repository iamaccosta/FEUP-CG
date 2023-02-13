#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float partR;
uniform float partG;
uniform float partB;
uniform float racio;


void main() {

    if(coords.z > racio){
        gl_FragColor = vec4(partR, partG, partB, 1);
    }else{
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
}