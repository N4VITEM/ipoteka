import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Variable } from './Variable.model';
import { Operation } from './Operation.model';
import { FormulaOperation } from './FormulaOperation.model';
import { FormulaVariable } from './FormulaVariable.model';

@Table
@ObjectType()
export class Formula extends Model<Formula> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => Int)
  id: number;

  @Column
  @Field(() => String)
  name: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  @Field(() => [String])
  variables: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  @Field(() => [String])
  operations: string[];

  @Column
  @Field(() => String)
  expression: string;

  @Field(() => [String], { nullable: true })
  @BelongsToMany(() => Variable, {
    through: { model: () => FormulaVariable, unique: false },
    constraints: false,
  })
  rel_variables: Variable[];

  @Field(() => [String], { nullable: true })
  @BelongsToMany(() => Operation, {
    through: { model: () => FormulaOperation, unique: false },
    constraints: false,
  })
  rel_operations: Operation[];
}
