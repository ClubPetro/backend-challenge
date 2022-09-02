import { CreatePlaceDto } from 'src/places/dto/create-place.dto';
import { UpdatePlaceDto } from 'src/places/dto/update-place.dto';

export const placeId = '1980ceb7-29d0-4fc5-bc2f-6eb7e8e8a54c';

export const mockPlaceResponse: any = () => ({
    id: placeId,
    name: 'Bahia',
    goal: '2022-10-01T00:00:00.000Z',
    created_at: '2022-09-02T01:53:52.789Z',
    updated_at: '2022-09-02T01:53:52.789Z',
    country: {
        id: 1,
        name: 'Brazil',
        shortname: 'br',
        flag: 'https://flagicons.lipis.dev/flags/4x3/br.svg',
    },
});

export const placeEntityList: any = [
    {
        ...mockPlaceResponse(),
    },
    {
        id: '95f61539-f128-410e-9d5e-876dfa5a33d1',
        name: 'Paris',
        goal: '2023-06-01T00:00:00.000Z',
        created_at: '2022-09-02T10:26:11.573Z',
        updated_at: '2022-09-02T10:26:11.573Z',
        country: {
            id: 3,
            name: 'France',
            shortname: 'fr',
            flag: 'https://flagicons.lipis.dev/flags/4x3/fr.svg',
        },
    },
];

export const placeUpdated: any = {
    ...mockPlaceResponse(),
    name: 'Salvador',
    goal: '12/2022',
};

export const createBody: CreatePlaceDto = {
    name: 'Bahia',
    goal: '10/2022',
    country: 'Brasil',
};

export const updateBody: UpdatePlaceDto = {
    name: 'Salvador',
    goal: '12/2022',
};

export const mockPlaceMethods: any = () => ({
    create: jest.fn().mockResolvedValue(mockPlaceResponse()),
    findAll: jest.fn().mockResolvedValue(placeEntityList),
    findOne: jest.fn().mockResolvedValue(mockPlaceResponse()),
    update: jest.fn().mockResolvedValue(placeUpdated),
    remove: jest.fn().mockResolvedValue(undefined),
});
