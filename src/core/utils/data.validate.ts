/**
 * Returns true of false, indicating whether the given array of numbers is sorted
 *  isSorted([])                        // true
 *  isSorted([-Infinity, -5, 0, 3, 9])  // true
 *  isSorted([3, 9, -3, 10])            // false
 *
 * @param {any[]} items
 * @return {boolean}
 */
function isSorted(items: any[], field?: string, order?: 'ASC' | 'DESC') {
  if (typeof items[0] === 'number') {
    const limit = items.length - 1;
    return items.every((_, i) => (i < limit ? items[i] <= items[i + 1] : true));
  }

  if (typeof items[0] === 'object') {
    if (!field || !order) {
      throw new Error('Need a field/order to check sort');
    }
    let isOk = true;
    items.reduce((prev, curr) => {
      if (!prev || !prev[field]) {
        return curr;
      }
      if (order === 'ASC') {
        if (prev[field] > curr[field]) {
          isOk = false;
          return curr;
        }
      }
      if (order === 'DESC') {
        if (prev[field] < curr[field]) {
          isOk = false;
          return curr;
        }
      }
      return curr;
    }, {});
    return isOk;
  }
}

export { isSorted };
