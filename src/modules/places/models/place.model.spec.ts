import { Place } from './place.model';

describe('Place model', () => {
  it('should instance place model', () => {
    const place = {
      id: 'test',
      country: 'test',
      location: 'test',
      goal: new Date(2022, 0, 1),
      imageUrl: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const test = new Place(place);
    expect(test).toMatchObject({
      ...place,
      meta: '01/2022',
    });
  });

  it('should instance place model with invalid date of goal value', () => {
    const place = {
      id: 'test',
      country: 'test',
      location: 'test',
      goal: 'invalid date',
      imageUrl: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(new Place(place).meta).toEqual(place.goal);
  });
});
