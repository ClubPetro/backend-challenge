import { Model } from 'sequelize';
import sinon from 'sinon';
import chai from 'chai';
import Places from '../../database/models/PlacesToGoModel';
import PlacesService from '../../api/services/PlacesService';
import { IPlacesToGo, IUpdatePlaces } from '../../api/interfaces';
import Country from '../../database/models/CountryModel';
import { NotFound, BadRequest } from '../../api/errors';

const { expect } = chai;

describe('Test class PlacesService should...', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('return all places', async function() {
    const mockedPlace1: Places = {
      'id': 1,
      'countryId': 1,
      'placeName': 'Sao Paulo',
      'meta': '05/2030',
      'createdAt': '2023-05-27T18:34:59.000Z',
      'updatedAt': '2023-05-28T15:14:06.000Z',
    } as Places;

    const mockedPlace2: Places = {
      'id': 2,
      'countryId': 1,
      'placeName': 'Rio de Janeiro',
      'meta': '06/2024',
      'createdAt': '2023-05-27T18:34:59.000Z',
      'updatedAt': '2023-05-27T18:34:59.000Z',
    } as Places;

    const mockedReturn = [mockedPlace2, mockedPlace1];

    sinon.stub(Model, 'findAll').resolves(mockedReturn);
    const service = new PlacesService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(mockedReturn);
    expect(result.length).to.be.equal(2);
  });

  it('return a place by id', async function() {
    const mockedPlace: Places = {
      'id': 1,
      'countryId': 1,
      'placeName': 'Sao Paulo',
      'meta': '05/2030',
      'createdAt': '2023-05-27T18:34:59.000Z',
      'updatedAt': '2023-05-28T15:14:06.000Z',
    } as Places;

    sinon.stub(Model, 'findByPk').resolves(mockedPlace);
    const service = new PlacesService();
    const result = await service.getById(1);

    expect(result).to.be.deep.equal(mockedPlace);
  });

  it('create a new place successfully', async function() {
    const mockedNewPlace:IPlacesToGo = {
      'countryId': 2,
      'placeName': 'Serra',
      'meta': '06/2023'
    };

    const mockedPlace: Places = new Places({
      'id': 8,
      'countryId': 2,
      'placeName': 'Serra',
      'meta': '2023-06-01',
      'createdAt': '2023-05-28T15:16:03.194Z',
      'updatedAt': '2023-05-28T15:16:03.194Z'
    });

    const mockedCountry: Country = {
      'id': 1,
      'name': 'Brazil',
      'urlImage': 'https://flagcdn.com/60x45/br.png'
    } as Country;

    sinon.stub(Model, 'create').resolves(mockedPlace);
    sinon.stub(Model, 'findByPk').resolves(mockedCountry);

    const service = new PlacesService();
    const result = await service.create(mockedNewPlace);

    expect(result).to.be.deep.equal(mockedPlace);
  });

  it('throw a exception when creating a new place with incorrect countryId', async function() {
    const mockedNewPlace:IPlacesToGo = {
      'countryId': 200,
      'placeName': 'Serra',
      'meta': '06/2023'
    };

    sinon.stub(Model, 'findByPk').resolves();
    const service = new PlacesService();

    try{
      await service.create(mockedNewPlace);
    } catch (error) {
      expect(error).to.be.deep.equal(new NotFound('Country not found'));
    }
  });

  it('throw a exception when creating a new place with incorrect meta', async function() {
    const mockedNewPlace:IPlacesToGo = {
      'countryId': 1,
      'placeName': 'Serra',
      'meta': '25/2023'
    };

    const mockedCountry: Country = {
      'id': 1,
      'name': 'Brazil',
      'urlImage': 'https://flagcdn.com/60x45/br.png'
    } as Country;

    sinon.stub(Model, 'findByPk').resolves(mockedCountry);
    const service = new PlacesService();

    try{
      await service.create(mockedNewPlace);
    } catch (error) {
      expect(error).to.be.deep.equal(new BadRequest('Invalid date or in the past'));
    }
  });

  it('throw a exception when creating a new place with incorrect placeName', async function() {
    const mockedNewPlace:IPlacesToGo = {
      'countryId': 1,
      'placeName': '',
      'meta': '12/2023'
    };

    const mockedCountry: Country = {
      'id': 1,
      'name': 'Brazil',
      'urlImage': 'https://flagcdn.com/60x45/br.png'
    } as Country;

    sinon.stub(Model, 'findByPk').resolves(mockedCountry);
    const service = new PlacesService();

    try{
      await service.create(mockedNewPlace);
    } catch (error) {
      expect(error).to.be.deep.equal(new BadRequest('placeName need at least 3 letters'));
    }
  });

  it('update a place successfully', async function() {
    const mockedPlace: Places = {
      'id': 1,
      'countryId': 1,
      'placeName': 'Sao Paulo',
      'meta': '05/2030',
      'createdAt': '2023-05-27T18:34:59.000Z',
      'updatedAt': '2023-05-28T15:14:06.000Z',
    } as Places;

    const mockedupdate: IUpdatePlaces = {
      "id": 1,
      "placeName": "Bonito",
      "meta": "05/2024"
    };

    sinon.stub(Model, 'findByPk').resolves(mockedPlace);
    sinon.stub(Model, 'update').resolves([1]);
    const service = new PlacesService();
    const result = await service.update(mockedupdate)

    expect(result).to.be.deep.equal([1]);
  });
  
  it('throw a exception when update a place that does not exist', async function() {
    const mockedupdate: IUpdatePlaces = {
      "id": 1,
      "placeName": "Bonito",
      "meta": "05/2024"
    };

    sinon.stub(Model, 'findByPk').resolves();
    const service = new PlacesService();

    try {
      await service.update(mockedupdate)
    } catch (error) {
      expect(error).to.be.deep.equal(new NotFound('Place not found'));
    }
  });

  it('delete a place successfully', async function() {
    const mockedPlace: Places = {
      'id': 1,
      'countryId': 1,
      'placeName': 'Sao Paulo',
      'meta': '05/2030',
      'createdAt': '2023-05-27T18:34:59.000Z',
      'updatedAt': '2023-05-28T15:14:06.000Z',
    } as Places;

    sinon.stub(Model, 'findByPk').resolves(mockedPlace);
    sinon.stub(Model, 'destroy').resolves();
    const service = new PlacesService();
    const result = await service.remove(1);

    expect(result).to.be.undefined;
  });
    
  it('throw a exception when delete a place that does not exist', async function() {
    sinon.stub(Model, 'findByPk').resolves();
    const service = new PlacesService();

    try {
      await service.remove(200)
    } catch (error) {
      expect(error).to.be.deep.equal(new NotFound('Place not found'));
    }
  });
});