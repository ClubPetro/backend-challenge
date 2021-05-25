interface ICountryCodeRepository {
  findCodeByName(country_name: string): Promise<string>;
}

export { ICountryCodeRepository };
