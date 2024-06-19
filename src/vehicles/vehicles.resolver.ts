import { Resolver, Query } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './schemas/vehicle.schema/vehicle.schema';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private vehiclesService: VehiclesService) {}

  @Query(() => [Vehicle])
  async vehicles(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }
}
