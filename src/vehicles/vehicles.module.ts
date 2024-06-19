import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import {
  Vehicle,
  VehicleSchema,
} from './schemas/vehicle.schema/vehicle.schema';
import { VehiclesService } from './vehicles.service';
import { VehiclesResolver } from './vehicles.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
    HttpModule,
  ],
  providers: [VehiclesService, VehiclesResolver],
})
export class VehiclesModule {}
