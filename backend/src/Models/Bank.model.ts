import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Program } from './Program.model';

@Table
@ObjectType()
export class Bank extends Model<Bank> {
  @AutoIncrement
  @PrimaryKey
  @Field(() => Int)
  @Column
  id: number;

  @Field(() => String)
  @Column
  name: string;

  @Field(() => String)
  @Column
  primaryColor: string;

  @Field(() => String)
  @Column
  secondaryColor: string;

  @HasMany(() => Program)
  @Field(() => [Program])
  programs: Program[];
}
