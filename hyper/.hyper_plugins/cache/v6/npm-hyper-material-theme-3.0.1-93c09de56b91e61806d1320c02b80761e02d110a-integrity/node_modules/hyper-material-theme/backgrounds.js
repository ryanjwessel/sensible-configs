const {themes} = require('./default.config');

const backgrounds = (opacity = 1) => ({
  [themes.palenight]: `rgba(41, 45, 62, ${opacity})`,
  [themes.darker]: `rgba(33, 33, 33, ${opacity})`,
  [themes.ocean]: `rgba(9, 11, 16, ${opacity})`,
  [themes.default]: `rgba(38, 50, 56, ${opacity})`
});

module.exports = {backgrounds};
