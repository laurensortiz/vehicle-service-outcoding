import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle } from './schemas/vehicle.schema/vehicle.schema';
import { CreateVehicleDto } from './dto/create-vehicle.dto/create-vehicle.dto';
import { parseStringPromise } from 'xml2js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
    private httpService: HttpService,
  ) {}

  async onModuleInit() {
    await this.fetchAndSaveVehicles();
  }

  async fetchAndSaveVehicles(): Promise<void> {
    try {
      const makesXml = await firstValueFrom(
        this.httpService.get(
          'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML',
        ),
      );
      const makesJson = await parseStringPromise(makesXml.data);

      const makes = makesJson.Response.Results[0].AllVehicleMakes;

      for (const make of makes) {
        const makeId = make.Make_ID[0];
        const makeName = make.Make_Name[0];

        const typesXml = await firstValueFrom(
          this.httpService.get(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=XML`,
          ),
        );
        const typesJson = await parseStringPromise(typesXml.data);

        const vehicleTypes =
          typesJson.Response.Results[0].VehicleTypesForMakeIds;

        if (!vehicleTypes) return;
        for (const type of vehicleTypes) {
          const createVehicleDto = new CreateVehicleDto();
          createVehicleDto.makeId = makeId;
          createVehicleDto.makeName = makeName;
          createVehicleDto.vehicleTypeId = type.VehicleTypeId[0];
          createVehicleDto.vehicleTypeName = type.VehicleTypeName[0];

          const createdVehicle = new this.vehicleModel(createVehicleDto);

          console.log('...Saving vehicle ID:', createdVehicle?.makeId);

          await createdVehicle.save();
        }
      }
    } catch (error) {
      console.error('Error in fetchAndSaveVehicles:', error);
    }
  }

  async findAll(): Promise<Vehicle[]> {
    const vehicles = await this.vehicleModel.find().exec();
    return vehicles;
  }
}
