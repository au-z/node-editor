uniform vec2 center;
uniform float angle;
uniform float scale;
uniform vec2 tSize;

uniform sampler2D tDiffuse;

varying vec2 vUV;

float pattern() {
  float s = sin(angle);
  float c = cos(angle);

  vec2 tex = vUV * tSize - center;
  vec2 point = vec2(c * tex.x - s * tex.y, s * tex.x + c * tex.y) * scale;

  return (sin(point.x) * sin(point.y)) * 4.0;
}

void main() {
  vec4 color = texture2D(tDiffuse, vUV);

  float avg = (color.r + color.g + color.b) / 3.0;
  gl_FragColor = vec4(vec3(avg * 10.0 - 5.0 + pattern()), color.a);
}