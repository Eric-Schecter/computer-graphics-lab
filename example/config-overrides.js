module.exports = function override(config, env) {
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  const index = loaders.length - 2;
  loaders.splice(index, 0, {
    test: /\.(frag|vert|fragment|vertex|shader|glsl)$/,
    use: [{
      loader: '@youyouzone/shader-loader',
      options: {
        publicPath: './src/shaderchunk',
      }
    }]
  }, {
    test: /\.worker\.ts$/,
    use: { loader: 'worker-loader' },
  })

  return config;
}