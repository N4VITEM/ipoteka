import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Bank } from './Bank.model';
import { Variable } from './Variable.model';
import { Discount } from './Discount.model';

@Table
@ObjectType()
export class Program extends Model<Program> {
  @AutoIncrement
  @PrimaryKey
  @Field(() => Int)
  @Column
  id: number;

  @Field(() => String)
  @Column
  name: string;

  @Field(() => [Variable])
  @Column({ type: DataType.JSONB })
  variables: Variable[];

  @Field(() => [Discount])
  @Column({ type: DataType.JSONB })
  discounts: Discount[];

  @ForeignKey(() => Bank)
  @Column
  bankId: number;

  @BelongsTo(() => Bank)
  @Field(() => Bank, { nullable: true })
  bank?: Bank;
}
