import { _getDateObj } from './_getDateObj';

describe('_getDateObj', () => {
  describe('behavior in all browsers except IE', () => {
    test('returns Date object itself', () => {
      const currentTime = new Date();

      expect(_getDateObj(currentTime)).toBe(currentTime);
    });
  });

  describe('behavior in IE', () => {
    test('returns IE specific date', () => {
      const currentTime: Date & { getVarDate?: () => {} } = new Date();
      const ieSpecificDate = 'IE specific date';

      currentTime.getVarDate = jest.fn(() => ieSpecificDate);

      expect(_getDateObj(currentTime)).toBe(ieSpecificDate);
    });
  });
});
