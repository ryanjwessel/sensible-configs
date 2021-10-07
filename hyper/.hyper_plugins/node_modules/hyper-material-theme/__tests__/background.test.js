/* globals describe, it, expect */

const {backgrounds} = require('../backgrounds');
const {themes} = require('../default.config');

describe('Backgrounds', () => {
  it('should get the correct background (no opacity)', () => {
    for (const theme in themes) {
      if (theme) {
        expect(backgrounds()[theme]).toMatchSnapshot();
      }
    }
  });

  it('should get the correct background (with opacity)', () => {
    for (const theme in themes) {
      if (theme) {
        expect(backgrounds(0.8)[theme]).toMatchSnapshot();
      }
    }
  });
});
