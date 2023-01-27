import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import config from '../src/common/config/config';
import * as request from 'supertest';
import { JwtTokenStrategy } from '../src/auth/strategies/token.strategy';
import { ImplementsService } from '../src/vehicles/implements/implements.service';
import { VehiclePartsService } from '../src/vehicles/parts/parts.service';
import { VehiclesModule } from '../src/vehicles/vehicles.module';
import { VehiclesService } from '../src/vehicles/vehicles.service';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';
import { PrismaService } from 'nestjs-prisma';

describe('Vehicles (e2e)', () => {
  let app: INestApplication;
  const vehiclesService = {
    listVehicles: () => ['test'],
    findVehicleById: () => ['test'],
    createVehicle: () => ['test'],
    updateVehicle: () => ['test'],
  };
  const vehiclePartsService = {
    listVehicleParts: () => ['test'],
    findVehiclePartById: () => ['test'],
    createVehiclePart: () => ['test'],
    updateVehiclePart: () => ['test'],
  };
  const implementsService = {
    listImplements: () => ['test'],
    findImplementById: () => ['test'],
    createImplement: () => ['test'],
    updateImplement: () => ['test'],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        VehiclesModule,
        UsersModule,
        ConfigModule.forRoot({
          load: [config],
        }),
      ],
      providers: [JwtTokenStrategy],
    })
      .overrideProvider(VehiclePartsService)
      .useValue(vehiclePartsService)
      .overrideProvider(VehiclesService)
      .useValue(vehiclesService)
      .overrideProvider(ImplementsService)
      .useValue(implementsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`GET /vehicles`, () => {
    return request(app.getHttpServer()).get('/vehicles').expect(200).expect(vehiclesService.listVehicles());
  });

  it(`GET /vehicles/1234`, () => {
    return request(app.getHttpServer()).get('/vehicles/1234').expect(200).expect(vehiclesService.findVehicleById());
  });

  it(`POST /vehicles`, () => {
    return request(app.getHttpServer()).post('/vehicles').expect(201).expect(vehiclesService.createVehicle());
  });

  it(`PATCH /vehicles`, () => {
    return request(app.getHttpServer()).patch('/vehicles/1234').expect(200).expect(vehiclesService.updateVehicle());
  });

  it('GET /implements', () => {
    return request(app.getHttpServer()).get('/implements').expect(200).expect(implementsService.listImplements());
  });

  it('GET /implements/1234', () => {
    return request(app.getHttpServer())
      .get('/implements/1234')
      .expect(200)
      .expect(implementsService.findImplementById());
  });

  it('POST /implements', () => {
    return request(app.getHttpServer()).post('/implements').expect(201).expect(implementsService.createImplement());
  });

  it('PATCH /implements/1234', () => {
    return request(app.getHttpServer())
      .patch('/implements/1234')
      .expect(200)
      .expect(implementsService.updateImplement());
  });

  it('GET /vehicles/parts', () => {
    return request(app.getHttpServer())
      .get('/vehicles/parts')
      .expect(200)
      .expect(vehiclePartsService.listVehicleParts());
  });

  it('GET /vehicles/parts/1234', () => {
    return request(app.getHttpServer())
      .get('/vehicles/parts/1234')
      .expect(200)
      .expect(vehiclePartsService.findVehiclePartById());
  });

  it('POST /vehicles/parts', () => {
    return request(app.getHttpServer())
      .post('/vehicles/parts')
      .expect(201)
      .expect(vehiclePartsService.createVehiclePart());
  });

  it('PATCH /vehicles/parts/1234', () => {
    return request(app.getHttpServer())
      .patch('/vehicles/parts/1234')
      .expect(200)
      .expect(vehiclePartsService.updateVehiclePart());
  });
});
