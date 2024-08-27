import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Project } from './Object.model';
import { Variable } from './Variable.model';

@Table
@ObjectType()
export class Discount extends Model<Discount> {
  @AutoIncrement
  @PrimaryKey
  @Field(() => Int)
  @Column
  id: number;

  @Field(() => [Variable])
  @Column({ type: DataType.JSONB })
  variables: Variable[];

  @Field(() => Project)
  @Column({ type: DataType.JSON })
  project: Project;
}
