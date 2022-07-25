import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

import { generateString, generateDate } from '../src/core/utils/data.generate';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/places (GET)', () => {
    return request(app.getHttpServer()).get('/places').expect(HttpStatus.OK);
  });

  it('/places (POST)', () => {
    return request(app.getHttpServer())
      .post('/places')
      .send({
        country: generateString(5),
        location: generateString(5),
        goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
        imageUrl: `http://${generateString(5)}.com.br`,
      })
      .expect(HttpStatus.CREATED)
      .then(res => {
        expect(res.body).toHaveProperty('country');
        expect(res.body).toHaveProperty('location');
        expect(res.body).toHaveProperty('goal');
        expect(res.body).toHaveProperty('imageUrl');
      });
  });

  it('/places/:id (GET)', () => {
    return request(app.getHttpServer())
      .post('/places')
      .send({
        country: generateString(5),
        location: generateString(5),
        goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
        imageUrl: `http://${generateString(5)}.com.br`,
      })
      .expect(HttpStatus.CREATED)
      .then(res => {
        return request(app.getHttpServer())
          .get(`/places/${res.body.id}`)
          .expect(HttpStatus.OK);
      });
  });

  it('/places/:id (PATCH)', () => {
    const toUpdate = {
      country: generateString(5),
      location: generateString(5),
      goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
      imageUrl: `http://${generateString(5)}.com.br`,
    };
    return request(app.getHttpServer())
      .post('/places')
      .send({
        country: generateString(5),
        location: generateString(5),
        goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
        imageUrl: `http://${generateString(5)}.com.br`,
      })
      .expect(HttpStatus.CREATED)
      .then(res => {
        return request(app.getHttpServer())
          .patch(`/places/${res.body.id}`)
          .send(toUpdate)
          .expect(HttpStatus.OK);
      });
  });

  it('/places/:id (DELETE)', () => {
    let deletePace;
    return request(app.getHttpServer())
      .post('/places')
      .send({
        country: generateString(5),
        location: generateString(5),
        goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
        imageUrl: `http://${generateString(5)}.com.br`,
      })
      .expect(HttpStatus.CREATED)
      .then(res => {
        deletePace = res.body;
        return request(app.getHttpServer())
          .delete(`/places/${deletePace.id}`)
          .expect(HttpStatus.OK);
      })
      .then(() => {
        return request(app.getHttpServer())
          .get(`/places/${deletePace.id}`)
          .expect(HttpStatus.OK)
          .then(res3 => {
            return expect(res3.body).toEqual({});
          });
      });
  });
});
