var debug     = require('debug')('glslify-optimize')
var escodegen = require('escodegen')
var optimize  = require('./optimize')
var through   = require('through2')
var esprima   = require('esprima')
var astw      = require('astw')

debug.type = 'error'

module.exports = transform

function transform(filename) {
  if (!/glslify/.test(filename)) return through()

  var stream = through(write, flush)
  var buffer = []

  return stream

  function write(chunk, _, next) {
    buffer.push(chunk)
    next()
  }

  function flush() {
    var src = buffer.join('\n')
    var ast = esprima.parse(src)
    var walk = astw(ast)

    debug('Original source:')
    debug('\n' + src)

    walk(function(node) {
      if (node.type !== 'Literal') return
      if (node.value !== 'glslify/adapter.js') return
      var parent = node
      var callee = node
      if (!(parent = parent.parent)) return
      if (!(parent = parent.parent)) return
      if (!(callee = parent.callee)) return
      if (!(callee = callee.callee)) return
      if (callee.name !== 'require') return
      var args = parent.arguments
      if (args.length < 2) return
      if (args[0].type !== 'Literal') return
      if (args[1].type !== 'Literal') return

      var vert = args[0].value
      var frag = args[1].value

      debug('Original fragment shader:')
      debug('\n' + frag)

      debug('Original vertex shader:')
      debug('\n' + vert)

      frag = optimize.frag(frag)
      vert = optimize.vert(vert)

      debug('Optimized vertex shader:')
      debug('\n' + vert)

      debug('Optimized fragment shader:')
      debug('\n' + frag)

      args[0].value = vert
      args[1].value = frag
    })

    this.push(escodegen.generate(ast))
    this.push(null)
  }
}
