import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Formula } from '../Models/Formula.model';
import { FormulaOperation } from '../Models/FormulaOperation.model';
import { FormulaVariable } from '../Models/FormulaVariable.model';
import { Operation } from '../Models/Operation.model';
import { Result } from '../Models/Result.model';
import { Variable } from '../Models/Variable.model';
import { FormulaResolver } from '../Resolvers/Formula.resolver';
import { FormulaService } from '../Services/Formula.service';
import { OperationService } from '../Services/Operation.service';
import { VariableService } from '../Services/Variable.service';
import { FormulaOperationService } from 'src/Services/FormulaOperation.service';
import { FormulaVariableService } from 'src/Services/FormulaVariable.service';
import { Bank } from 'src/Models/Bank.model';
import { Program } from 'src/Models/Program.model';
import { BankService } from 'src/Services/Bank.service';
import { ProgramService } from 'src/Services/Program.service';
import { BankResolver } from 'src/Resolvers/Bank.resolver';
import { ProgramResolver } from 'src/Resolvers/Program.resolver';
import { Discount } from 'src/Models/Discount.model';
import { Project } from 'src/Models/Object.model';
import { ProjectService } from 'src/Services/Object.service';
import { ProjectResolver } from 'src/Resolvers/Object.resolver';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Formula,
      Operation,
      Variable,
      FormulaOperation,
      FormulaVariable,
      Bank,
      Program,
      Result,
      Discount,
      Project,
    ]),
  ],
  controllers: [],
  providers: [
    FormulaService,
    FormulaResolver,
    OperationService,
    VariableService,
    FormulaOperationService,
    FormulaVariableService,
    BankService,
    ProgramService,
    BankResolver,
    ProgramResolver,
    ProjectService,
    ProjectResolver,
  ],
})
export class FormulaModule {}
