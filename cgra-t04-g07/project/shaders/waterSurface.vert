attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D distortionMap;

varying vec2 vTextureCoord;

void main() {
	vTextureCoord = aTextureCoord;

	//vec3 offset = vec3(0,0,0);

	//offset = aVertexNormal*0.1*texture2D(distortionMap, vTextureCoord).b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}

