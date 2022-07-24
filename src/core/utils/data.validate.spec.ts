import { isSorted } from './data.validate';
describe('Data validate', () => {
  describe('Is sorted', () => {
    const orderedListAsc = [
      {
        id: 1,
        test: new Date(2022, 0, 1),
      },
      {
        id: 2,
        test: new Date(2022, 0, 2),
      },
      {
        id: 3,
        test: new Date(2022, 0, 3),
      },
      {
        id: 4,
        test: new Date(2022, 0, 4),
      },
      {
        id: 5,
        test: new Date(2022, 0, 5),
      },
    ];
    const orderedListDesc = [
      {
        id: 5,
        test: new Date(2022, 0, 5),
      },
      {
        id: 4,
        test: new Date(2022, 0, 4),
      },
      {
        id: 3,
        test: new Date(2022, 0, 3),
      },
      {
        id: 2,
        test: new Date(2022, 0, 2),
      },
      {
        id: 1,
        test: new Date(2022, 0, 1),
      },
    ];
    const unorderedList = [
      {
        id: 2,
        test: new Date(2022, 0, 2),
      },
      {
        id: 1,
        test: new Date(2022, 0, 1),
      },
      {
        id: 3,
        test: new Date(2022, 0, 3),
      },
      {
        id: 4,
        test: new Date(2022, 0, 4),
      },
      {
        id: 5,
        test: new Date(2022, 0, 5),
      },
    ];
    it('array of number is sorted', () => {
      expect(isSorted([-Infinity, -5, 0, 3, 9])).toBeTruthy();
      expect(isSorted([100, 200, 1234])).toBeTruthy();
    });
    it('array of number is not sorted', () => {
      expect(isSorted([1, -Infinity, -5, 0, 3, 9])).toBeFalsy();
      expect(isSorted([100, 200, 1234, -1])).toBeFalsy();
    });
    it('array of object is sorted', () => {
      expect(isSorted(orderedListAsc, 'test', 'ASC')).toBeTruthy();
      expect(isSorted(orderedListDesc, 'test', 'DESC')).toBeTruthy();
    });
    it('array of object is not sorted', () => {
      expect(isSorted(orderedListAsc, 'test', 'DESC')).toBeFalsy();
      expect(isSorted(orderedListDesc, 'test', 'ASC')).toBeFalsy();
      expect(isSorted(unorderedList, 'test', 'DESC')).toBeFalsy();
    });
    it('should throw exception if not set field and order with array of object', () => {
      try {
        isSorted([{}]);
        fail('expect throw exception');
      } catch (error) {
        expect(error.message).toEqual('Need a field/order to check sort');
      }
    });
  });
});
