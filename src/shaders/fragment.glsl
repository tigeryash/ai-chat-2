uniform float uTime;
uniform vec3 color;
varying vec2 vUv;

void main() {
  gl_FragColor = vec4(.0, vUv.y, vUv.x, 1.0);
  }