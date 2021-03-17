import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/color.js',
    output: {
      file: 'dist/color.js',
      format: 'cjs'
    },
    sourceMap: true,
    plugins: [
      commonjs()
    ]
  };