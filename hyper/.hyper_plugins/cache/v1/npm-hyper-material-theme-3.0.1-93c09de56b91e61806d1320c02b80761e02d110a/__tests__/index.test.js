/* globals describe, it, expect */

const {decorateConfig} = require('..');

describe('Configurations', () => {
  it('should match snapshot without MaterialTheme config', () => {
    const mainConfig = {};
    expect(decorateConfig(mainConfig)).toMatchSnapshot();
  });

  it('should match snapshot with config specified', () => {
    const mainConfig = {
      cursorColor: 'red',
      padding: '25px 25px',
      termCss: '.hyper { color: red; }',
      css: '.lol { background: red; }',
      MaterialTheme: {
        accentColor: 'green'
      }
    };
    expect(decorateConfig(mainConfig)).toMatchSnapshot();
  });
});
