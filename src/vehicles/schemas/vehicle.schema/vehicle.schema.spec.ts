import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './vehicle.schema';
import { Model } from 'mongoose';

describe('VehicleSchema', () => {
  let vehicleModel: Model<Vehicle>;

  beforeAll(async () => {
    jest.setTimeout(20000);
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          process.env.MONGO_URI || 'mongodb://mongodb:27017/nest',
        ),
        MongooseModule.forFeature([
          { name: Vehicle.name, schema: VehicleSchema },
        ]),
      ],
    }).compile();

    vehicleModel = module.get<Model<Vehicle>>(getModelToken(Vehicle.name));
  });

  it('should create a vehicle', async () => {
    const vehicle = new vehicleModel({
      makeId: 1,
      makeName: 'Test Make',
      vehicleTypeId: 1,
      vehicleTypeName: 'Test Type',
    });

    const savedVehicle = await vehicle.save();
    expect(savedVehicle).toBeDefined();
    expect(savedVehicle.makeId).toBe(1);
    expect(savedVehicle.makeName).toBe('Test Make');
    expect(savedVehicle.vehicleTypeId).toBe(1);
    expect(savedVehicle.vehicleTypeName).toBe('Test Type');
  });

  afterAll(async () => {
    if (vehicleModel) {
      await vehicleModel.deleteMany({});
      await vehicleModel.db.close();
    }
  });
});
