import { Model } from 'sequelize';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import App from '../../app';
import Country from '../../database/models/CountryModel';

const { expect } = chai;
chai.use(chaiHttp);

describe('Test class CountryController', function() {
  afterEach(function() {
    sinon.restore();
  });

  const testApp = new App();

  it('should return all countries', async function() {
    const mockedCountry1: Country = {
      'id': 1,
      'name': 'Brazil',
      'urlImage': 'https://flagcdn.com/60x45/br.png'
    } as Country;

    const mockedCountry2: Country = {
      'id': 2,
      'name': 'United States',
      'urlImage': 'https://flagcdn.com/60x45/us.png'
    } as Country;

    const mockedReturn = [mockedCountry1, mockedCountry2];

    sinon.stub(Model, 'findAll').resolves(mockedReturn);
    
    const response = await chai.request(testApp.app).get('/countries').send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockedReturn);
  });
});