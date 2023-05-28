import { Model } from 'sequelize';
import sinon from 'sinon';
import chai from 'chai';
import Country from '../../database/models/CountryModel';
import CountryService from '../../api/services/CountryService';

const { expect } = chai;

describe('Test class CountryService', function() {
  afterEach(function() {
    sinon.restore();
  });

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
    const service = new CountryService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(mockedReturn);
    expect(result.length).to.be.equal(2);
  });

  it('should return a country by id', async function() {
    const mockedCountry: Country = {
      'id': 1,
      'name': 'Brazil',
      'urlImage': 'https://flagcdn.com/60x45/br.png'
    } as Country;

    sinon.stub(Model, 'findByPk').resolves(mockedCountry);
    const service = new CountryService();
    const result = await service.getById(1);

    expect(result).to.be.deep.equal(mockedCountry);
  });
});