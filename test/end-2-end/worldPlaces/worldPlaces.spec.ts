import { Repository } from 'typeorm';
import { saveWorldPlaces, updateWorldPlaces } from './data';
import Application from '../main.test';
import { WorldPlacesModule } from '../../../src/modules/worldPlaces/worldPlaces.module';
import { WorldPlaces } from '../../../src/modules/worldPlaces/worldPlaces.entity';

describe('worldPlaces', () => {
  let app: any;
  let repository: Repository<WorldPlaces>;

  beforeAll(async () => {
    const { server, moduleRef } = await Application([WorldPlacesModule]);
    app = server;
    repository = moduleRef.get('WorldPlacesRepository');
  });

  it(`/POST worldPlaces`, async (done) => {
    const { country, flagUrl } = saveWorldPlaces;
    await app
      .post('/worldPlaces')
      .send(saveWorldPlaces)
      .set('Accept', 'application/json')
      .expect(201);

    const worldPlace = await repository.findOne(1);
    expect(worldPlace).toEqual(
      expect.objectContaining({ id: 1, country, flagUrl }),
    );
    done();
  });

  it(`/PUT worldPlaces`, async (done) => {
    await repository.save(saveWorldPlaces);
    await app
      .put(`/worldPlaces/1`)
      .send(updateWorldPlaces)
      .set('Accept', 'application/json')
      .expect(204);
    const worldPlaces = await repository.findOne(1);
    expect(worldPlaces).toEqual(expect.objectContaining(worldPlaces));

    done();
  });

  it(`/GET all worldPlaces`, async (done) => {
    const { country, flagUrl } = saveWorldPlaces;
    await repository.save(saveWorldPlaces);
    const { body } = await app.get('/worldPlaces/getAll').expect(200);
    expect(body[0]).toEqual(
      expect.objectContaining({ id: 1, country, flagUrl }),
    );
    done();
  });

  it(`/GET worldPlaces by id`, async (done) => {
    const { country, flagUrl } = saveWorldPlaces;
    await repository.save(saveWorldPlaces);
    const { body } = await app.get('/worldPlaces/1').expect(200);
    expect(body).toEqual(expect.objectContaining({ id: 1, country, flagUrl }));
    done();
  });

  it(`/DELETE worldPlaces by id`, async (done) => {
    await repository.save(saveWorldPlaces);
    const { body } = await app.delete('/worldPlaces/1').expect(200);
    expect(body).toEqual(
      expect.objectContaining({
        raw: [],
        affected: 1,
      }),
    );
    done();
  });

  afterEach(async () => {
    await repository.query(
      `truncate table "world_places" restart identity cascade;`,
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
