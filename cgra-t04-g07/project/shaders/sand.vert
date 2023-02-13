attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D sandMap;

varying vec2 vTextureCoord;

void main() {
	vTextureCoord = aTextureCoord;
	vec3 offset = vec3(0.0, 0.0, 0.0);

	//if(texture2D(sandMap, vec2(0.0, 0.1) + vTextureCoord).b > 0.5)
	offset = aVertexNormal * 0.15 * (texture2D(sandMap, vTextureCoord).b - 0.4);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
