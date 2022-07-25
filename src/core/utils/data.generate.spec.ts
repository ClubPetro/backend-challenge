import { generateString, generateDate } from './data.generate';
describe('Data generate', () => {
  it('should be able generate string', () => {
    const generated = generateString(5);
    expect(generated).toBeDefined();
    expect(generated.length).toEqual(5);
  });
  it('should be able generate date', () => {
    const start = new Date(2022, 0, 1);
    const end = new Date(2030, 11, 1);
    const generated = generateDate(start, end);
    expect(generated).toBeDefined();
    expect(generated.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(generated.getTime()).toBeLessThanOrEqual(end.getTime());
  });
});
