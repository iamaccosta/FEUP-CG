#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D sandMap;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 filter = texture2D(sandMap, vTextureCoord);

    /*if (filter.b < 0.4){
        color=vec4(0.52, 0.18, 0.11, 1.0);
        color.rg *= filter.rg;
        color.r = color.r * 0.52 + color.g *0.18 + color.b * 0.11;
	    color.g = color.r * 0.52 + color.g *0.18 + color.b * 0.11;
	    color.b = color.r * 0.52 + color.g *0.18 + color.b * 0.11;
    }*/

    gl_FragColor = color*0.9;
    gl_FragColor.rgb = color.rgb*filter.rgb;
}