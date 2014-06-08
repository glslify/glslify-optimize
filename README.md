# glslify-optimize [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A browserify transform stream that optimizes your glslify shaders using
[glsl-optimizer](https://github.com/aras-p/glsl-optimizer), the library
used in Unity for mobile shader optimization.

## Usage

[![NPM](https://nodei.co/npm/glslify-optimize.png)](https://nodei.co/npm/glslify-optimize/)

Use the `glslify-optimize` transform *after* using `glslify` for it to work
correctly:

``` bash
browserify -t glslify -t glslify-optimize
```

``` javascript
var browserify = require('browserify')

browserify('index.js')
  .transform('glslify')
  .transform('glslify-optimize')
  .pipe(process.stdout)
```

## License

MIT. See [LICENSE.md](http://github.com/hughsk/glslify-optimize/blob/master/LICENSE.md) for details.
