import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FormulaVariable } from 'src/Models/FormulaVariable.model';

@Injectable()
export class FormulaVariableService {
  constructor(
    @InjectModel(FormulaVariable)
    private readonly formulaVariable: typeof FormulaVariable,
  ) {}

  async getVariables(formulaId: number): Promise<string[]> {
    const operations: string[] = [];
    (
      await this.formulaVariable.findAll({ where: { formulaId: formulaId } })
    ).map((variable) => {
      operations.push(variable.variable);
    });
    return operations;
  }
}
