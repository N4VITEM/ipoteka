import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Formula } from './Formula.model';
import { FormulaOperation } from './FormulaOperation.model';

@Table
@ObjectType()
export class Operation extends Model<Operation> {
  @PrimaryKey
  @Unique
  @Column
  @Field(() => String)
  name: string;

  @Field(() => [Formula])
  @BelongsToMany(() => Formula, {
    through: { model: () => FormulaOperation, unique: false },
    constraints: false,
  })
  formulas: Formula[];
}
