import { Model } from 'sequelize';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import App from '../../app';
import Places from '../../database/models/PlacesToGoModel';
import { IPlacesToGo, IUpdatePlaces } from '../../api/interfaces';
import Country from '../../database/models/CountryModel';

const { expect } = chai;
chai.use(chaiHttp);

describe('Test class PlacesController should...', function() {
  afterEach(function() {
    sinon.restore();
  });

  const testApp = new App();

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

    const response = await chai.request(testApp.app).get('/places').send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockedReturn);
  });

  it('create a new place', async function() {
    const mockedNewPlace:IPlacesToGo = {
      'countryId': 2,
      'placeName': 'Serra',
      'meta': '06/2023'
    };

    const mockedPlace: Places = {
      'id': 8,
      'countryId': 2,
      'placeName': 'Serra',
      'meta': '2023-06-01',
      'createdAt': '2023-05-28T15:16:03.194Z',
      'updatedAt': '2023-05-28T15:16:03.194Z'
    } as Places;

    const mockedCountry: Country = {
      'id': 1,
      'name': 'Brazil',
      'urlImage': 'https://flagcdn.com/60x45/br.png'
    } as Country;

    sinon.stub(Model, 'findByPk').resolves(mockedCountry);
    sinon.stub(Model, 'create').resolves(mockedPlace);

    const response = await chai.request(testApp.app).post('/places').send(mockedNewPlace);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(mockedPlace);
  });

  it('update a place', async function() {
    const mockedupdate: IUpdatePlaces = {
      "id": 1,
      "placeName": "Bonito",
      "meta": "05/2024"
    };

    const mockedPlace: Places = {
      'id': 1,
      'countryId': 1,
      'placeName': 'Sao Paulo',
      'meta': '05/2030',
      'createdAt': '2023-05-27T18:34:59.000Z',
      'updatedAt': '2023-05-28T15:14:06.000Z',
    } as Places;

    sinon.stub(Model, 'findByPk').resolves(mockedPlace);
    sinon.stub(Model, 'update').resolves([1]);

    const response = await chai.request(testApp.app).put('/places').send(mockedupdate);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Updated' });
  });

  it('delete a place', async function() {
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

    const response = await chai.request(testApp.app).delete('/places').send({ id: 1 });

    expect(response.status).to.be.equal(204);
  });
});