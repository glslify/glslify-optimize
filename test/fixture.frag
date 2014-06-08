precision mediump float;

uniform sampler2D uTexture;
varying vec2 vUv;

#pragma glslify: dither = require(glsl-dither)

void main() {
  vec4 color = texture2D(uTexture, vUv);
  gl_FragColor = dither(gl_FragCoord.xy, color);
}
