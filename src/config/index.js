const globalConfig = {
  endpoint: 'http://localhost:3000',
  darkBackground: '#D8D8D8',
  midDark: '#9FA6A6',
  darkText: '#676E6E',
  veryDarkText: '#666D6D',
  lightText: '#fff',
  font: 'Avenir Next',
  greenGradient: ['#06AEC1', '#06BFA7'],
  lightGreen: '#70D1C4',
  darkerGreen: '#64C2B6',
}

const development = {
  endpoint: 'http://localhost:3000'
}

const test = {
}

const production = {
}

let toExport
switch(process.env.NODE_ENV) {
  case 'development':
    toExport = Object.assign({}, globalConfig, development)
    break
  case 'test':
    toExport = Object.assign({}, globalConfig, test)
    break
  case 'production':
    toExport = Object.assign({}, globalConfig, production)
    break
  default:
    toExport = Object.assign({}, globalConfig)
}

module.exports = toExport
