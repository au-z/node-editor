uniform sampler2D tDiffuse;
varying vec2 vUV;

void main() {
  vec4 color = texture2D(tDiffuse, vUV);
  gl_FragColor = color;
}