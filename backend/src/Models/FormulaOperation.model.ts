import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Formula } from './Formula.model';
import { Operation } from './Operation.model';

@Table
export class FormulaOperation extends Model<FormulaOperation> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Formula)
  @Column({ unique: false })
  formulaId: number;

  @ForeignKey(() => Operation)
  @Column({ unique: false })
  operation: string;
}
