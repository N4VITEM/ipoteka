import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Formula } from './Formula.model';
import { Variable } from './Variable.model';

@Table
export class FormulaVariable extends Model<FormulaVariable> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Formula)
  @Column({ unique: false })
  formulaId: number;

  @ForeignKey(() => Variable)
  @Column({ unique: false })
  variable: string;
}
