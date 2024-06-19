import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Vehicle extends Document {
  @Prop()
  @Field()
  makeId: number;

  @Prop()
  @Field()
  makeName: string;

  @Prop()
  @Field()
  vehicleTypeId: number;

  @Prop()
  @Field()
  vehicleTypeName: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
