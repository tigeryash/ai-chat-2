#pragma glslify: noise = require('glsl-noise/simplex/3d')


uniform float uTime;

varying vec2 vUv;

void main() {
  vec3 noiseInput = vec3(position.x / 2.0,( position.y / 2.0) , uTime * 0.05);
  float n = noise(noiseInput);
  n = n * 0.5 + 0.5;
  
  vec3 newPosition = position;
  newPosition.z += n;

  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);
}