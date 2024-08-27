import { Field, ObjectType } from '@nestjs/graphql';
import {
  AllowNull,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Formula } from './Formula.model';
import { FormulaVariable } from './FormulaVariable.model';

@Table
@ObjectType()
export class Variable extends Model<Variable> {
  @PrimaryKey
  @Unique
  @Column
  @Field(() => String)
  name: string;

  @AllowNull
  @Column
  @Field(() => String, { nullable: true })
  definition: string;

  @Column
  @Field(() => Boolean)
  isConstant: boolean;

  @Field(() => [Formula])
  @BelongsToMany(() => Formula, {
    through: { model: () => FormulaVariable, unique: false },
    constraints: false,
  })
  formulas: Formula[];
}
