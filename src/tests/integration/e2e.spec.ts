import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { Utils } from '../../utils/utils';
import { User } from '../../modules/user/entities/user.entity';
import { AuthenticationDTO } from '../../modules/authentication/dto/authentication.dto';
import { RefreshTokenDTO } from '../../modules/authentication/dto/refresh-token.dto';
import { CreateTravelDTO } from '../../modules/travel/dto/create-travel.dto';
import { Travel } from '../../modules/travel/entities/travel.entity';
import { UpdateTravelDTO } from '../../modules/travel/dto/update-travel.dto';

const userEmail = Utils.generateId();
const fakeLocale = Utils.generateId();
let createdUser: User;
let token: string;

describe('Integration Test | e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // HEALTHCHECK
  describe('healthcheck', () => {
    it('should return 200 status (GET /)', () => {
      return request(app.getHttpServer()).get('/').expect(200);
    });

    it('should return 200 status (GET /status)', () => {
      return request(app.getHttpServer()).get('/status').expect(200);
    });

    it('should return 200 status (GET /healthcheck)', () => {
      return request(app.getHttpServer()).get('/healthcheck').expect(200);
    });
  });

  // USER & AUTHENTICATION
  describe('user', () => {
    it('should return a new user (POST /user)', async () => {
      const user: CreateUserDto = {
        name: 'admin',
        email: `${userEmail}@admin.com`,
        password: 'admin',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(user)
        .expect(201)
        .then((res) => {
          createdUser = res.body;
        });

      expect(createdUser.id).toBeGreaterThan(0);
      expect(new Date(createdUser.createdAt)).toBeInstanceOf(Date);
    });

    it('should return a bad request for missing fields (POST /user)', async () => {
      const user = {
        name: 'admin',
      };

      await request(app.getHttpServer()).post('/user').send(user).expect(400);
    });

    it('should return a valid access_token (POST /auth)', async () => {
      const auth: AuthenticationDTO = {
        email: `${userEmail}@admin.com`,
        password: 'admin',
      };

      await request(app.getHttpServer())
        .post('/auth')
        .send(auth)
        .expect(200)
        .then((res) => {
          token = res.body.access_token;
        });

      expect(token.length).toBeGreaterThan(0);
    });

    it('should return a valid refreshed access_token (POST /auth/refresh-token)', async () => {
      const auth: RefreshTokenDTO = {
        token,
      };

      await request(app.getHttpServer())
        .post('/auth/refresh-token')
        .send(auth)
        .expect(200)
        .then((res) => {
          token = res.body.access_token;
        });

      expect(token.length).toBeGreaterThan(0);
    });

    it('should return bad request for invalid credentials (POST /auth)', async () => {
      const auth: AuthenticationDTO = {
        email: `${userEmail}@anonymous.com`,
        password: 'random_password',
      };

      await request(app.getHttpServer()).post('/auth').send(auth).expect(401);
    });
  });

  // TRAVELS
  describe('travels', () => {
    let createdTravel: Travel;
    let updatedTravel: Travel;
    let travelList: Travel[];
    let travel: Travel;

    it('should return a new travel (POST /travel)', async () => {
      const newTravel: CreateTravelDTO = {
        country: 'Brasil',
        flagUrl: 'bandeira_brasil.png',
        goal: '12/2024',
        locale: fakeLocale,
        userId: createdUser.id,
      };
      await request(app.getHttpServer())
        .post('/travel')
        .set('Authorization', `Bearer ${token}`)
        .send(newTravel)
        .expect(201)
        .then((res) => {
          createdTravel = res.body;
        });

      expect(createdTravel.id).toBeGreaterThan(0);
      expect(new Date(createdTravel.createdAt)).toBeInstanceOf(Date);
    });

    it('should return a paginated travel list (GET /travels)', async () => {
      await request(app.getHttpServer())
        .get(`/travels?userId=${createdUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
          travelList = res.body.data;
        });
      expect(travelList.length).toBeGreaterThan(0);
    });

    it('should return unauthorized (GET /travels)', () => {
      return request(app.getHttpServer()).get('/travels').expect(401);
    });

    it('should return a travel (GET /travel/:id)', async () => {
      await request(app.getHttpServer())
        .get(`/travel/${createdTravel.id}?userId=${createdUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
          travel = res.body;
        });
      expect(travel.id).toBeGreaterThan(0);
    });

    it('should return unauthorized (GET /travel/:id)', () => {
      return request(app.getHttpServer()).get('/travel/1').expect(401);
    });

    it('should return a updated travel (PUT /travel/:id)', async () => {
      const data: UpdateTravelDTO = {
        locale: 'São Paulo',
        userId: createdUser.id,
      };
      await request(app.getHttpServer())
        .put(`/travel/${createdTravel.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect(200)
        .then((res) => {
          updatedTravel = res.body;
        });

      expect(updatedTravel.id).toBeGreaterThan(0);
      expect(updatedTravel.locale).toEqual('São Paulo');
    });

    it('should return unauthorized (PUT /travel/:id)', () => {
      return request(app.getHttpServer()).put('/travel/1').expect(401);
    });

    it('should return success response for deleted travel (DELETE /travel/:id)', async () => {
      await request(app.getHttpServer())
        .delete(`/travel/${createdTravel.id}?userId=${createdUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should return unauthorized (DELETE /travel/:id)', () => {
      return request(app.getHttpServer()).delete('/travel/1').expect(401);
    });
  });
});
