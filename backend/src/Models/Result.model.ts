import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { Formula } from './Formula.model';

@Table
@ObjectType()
export class Result extends Model<Result> {
  @AutoIncrement
  @PrimaryKey
  @Field(() => Int)
  @Column
  id: number;

  @Column
  @Field(() => String)
  name: string;

  @ForeignKey(() => Formula)
  @Column
  @Field(() => Int)
  formulaID: number;

  @Column
  @Field(() => String)
  result: string;
}
