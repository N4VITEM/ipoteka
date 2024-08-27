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
export class Project extends Model<Project> {
  @AutoIncrement
  @PrimaryKey
  @Field(() => Int)
  @Column
  id: number;

  @Field(() => String)
  @Column
  object: string;

  @Field(() => Int)
  @Column
  queue: number;
}
