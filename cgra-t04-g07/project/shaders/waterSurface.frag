#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D distortionMap;
uniform float timeFactor;

void main() {
    //vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 filter = texture2D(distortionMap, vTextureCoord + vec2(timeFactor*0.0025, timeFactor*0.0025));

    vec2 coord = vTextureCoord;

    coord.s += (filter.r - 0.5)*0.1;
    coord.t += (filter.g - 0.5)*0.1;

    vec4 color = texture2D(uSampler, coord);

    gl_FragColor = color;
}