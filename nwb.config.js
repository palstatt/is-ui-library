module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'internalsys',
      externals: {
        react: 'React'
      }
    }
  }
}
