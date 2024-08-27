import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
@ObjectType()
export class Queue extends Model<Queue> {
  @AutoIncrement
  @PrimaryKey
  @Field(() => Int)
  @Column
  id: number;
}
