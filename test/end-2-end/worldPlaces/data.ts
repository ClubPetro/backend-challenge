import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { CreateWorldPlaceDto } from '../../../src/modules/worldPlaces/dto/create.worldPlace.dto';
import { UpdateWorldPlaceDto } from '../../../src/modules/worldPlaces/dto/update.worldPlace.dto';

const createWorldPlaceDtoFactory = Factory.Sync.makeFactory<CreateWorldPlaceDto>(
  {
    country: faker.address.country(),
    flagUrl: faker.image.imageUrl(),
    location: faker.address.streetName(),
    goal: '1999-01-08 04:05:06',
  },
);

const updateWorldPlaceDtoFactory = Factory.Sync.makeFactory<UpdateWorldPlaceDto>(
  {
    location: faker.address.streetName(),
    goal: '1999-01-08 04:05:06',
  },
);

const saveWorldPlaces = createWorldPlaceDtoFactory.build();
const updateWorldPlaces = updateWorldPlaceDtoFactory.build();

export { updateWorldPlaces, saveWorldPlaces };
