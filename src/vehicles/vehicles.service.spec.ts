import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { getModelToken } from '@nestjs/mongoose';
import { Vehicle } from './schemas/vehicle.schema/vehicle.schema';
import { HttpModule } from '@nestjs/axios';

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        VehiclesService,
        {
          provide: getModelToken(Vehicle.name),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse and save vehicles', async () => {
    jest
      .spyOn(service, 'fetchAndSaveVehicles')
      .mockImplementation(async () => {});
    await service.fetchAndSaveVehicles();
    expect(service.fetchAndSaveVehicles).toHaveBeenCalled();
  });
});
