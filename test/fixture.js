var canvas        = document.body.appendChild(document.createElement('canvas'))
var triangle      = require('a-big-triangle')
var createTexture = require('gl-texture2d')
var getContext    = require('gl-context')
var createShader  = require('glslify')
var lena          = require('lena')

canvas.width = 512
canvas.height = 512

var gl = getContext(canvas, render)
var tex = createTexture(gl, lena)
var shader = createShader({
    vert: './fixture.vert'
  , frag: './fixture.frag'
})(gl)

function render() {
  shader.bind()
  shader.uniforms.uTexture = tex.bind()
  triangle(gl)
}
