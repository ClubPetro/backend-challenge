import { HealthCheck } from '@/shared/data';

type SutTypes = {
  sut: HealthCheck;
};

const makeSut = (): SutTypes => {
  const sut = new HealthCheck();

  return {
    sut,
  };
};

describe('HealthCheck: get the healthcheck application', () => {
  it('should be able return the healthcheck application', () => {
    const { sut } = makeSut();

    const response = sut.execute();

    expect(response.env).toBe('test');
    expect(typeof response.uptime).toBe('number');
  });
});
