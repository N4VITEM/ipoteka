import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createOperationDTO } from '../DTO/Operation.dto';
import { createVariableDTO } from '../DTO/Variable.dto';
import { Formula } from '../Models/Formula.model';
import { FormulaOperation } from '../Models/FormulaOperation.model';
import { FormulaVariable } from '../Models/FormulaVariable.model';
import { FormulaOperationService } from './FormulaOperation.service';
import { FormulaVariableService } from './FormulaVariable.service';

@Injectable()
export class FormulaService {
  constructor(
    @InjectModel(Formula)
    private readonly formula: typeof Formula,
    private readonly formulaOperationService: FormulaOperationService,
    private readonly formulaVariableService: FormulaVariableService,
  ) {}

  async getById(id: number): Promise<Formula> {
    return this.formula.findOne({ where: { id: id } });
  }

  async getAll(): Promise<Formula[]> {
    return this.formula.findAll();
  }

  async calculate(id: number, variables: number[]): Promise<number> {
    const formula = await this.getById(id);
    let expression = formula.expression;

    const variableNames = formula.variables;
    variableNames.forEach((variableName, index) => {
      const variableValue = variables[index];
      expression = expression.replace(
        new RegExp(`\\b${variableName}\\b`, 'g'),
        variableValue.toString(),
      );
    });

    let result: number;
    try {
      result = eval(expression);
    } catch (err) {
      throw new Error(err);
    }
    result = Number.isNaN(result) === true || result === Infinity ? 0 : result;
    return Math.round(result * 100) / 100;
  }

  async add(
    name: string,
    variables: createVariableDTO[],
    operations: createOperationDTO[],
    expression: string,
  ) {
    const parsedVariables: string[] = variables.map(
      (variable) => variable.name,
    );
    const parsedOperations: string[] = operations.map(
      (operation) => operation.name,
    );

    const formula = await Formula.create({
      name: name,
      variables: parsedVariables,
      operations: parsedOperations,
    });

    for (const variable of variables) {
      await FormulaVariable.create({
        formulaId: formula.id,
        variable: variable.name,
      });
    }

    for (const operation of operations) {
      await FormulaOperation.create({
        formulaId: formula.id,
        operation: operation.name,
      });
    }

    await this.setExpression(expression, name);
    return formula;
  }

  private async setExpression(expression: string, name: string) {
    const formula = await Formula.findOne({ where: { name: name } });
    formula.expression = expression;
    await formula.save();
  }
}
