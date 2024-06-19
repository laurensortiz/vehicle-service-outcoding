import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Vehicle,
  VehicleSchema,
} from './schemas/vehicle.schema/vehicle.schema';
import { HttpModule } from '@nestjs/axios';

describe('VehiclesResolver', () => {
  let resolver: VehiclesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          process.env.MONGO_URI || 'mongodb://mongodb:27017/nest',
        ),
        MongooseModule.forFeature([
          { name: Vehicle.name, schema: VehicleSchema },
        ]),
        HttpModule,
      ],
      providers: [VehiclesResolver, VehiclesService],
    }).compile();

    resolver = module.get<VehiclesResolver>(VehiclesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
