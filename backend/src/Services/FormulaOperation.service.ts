import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FormulaOperation } from '../Models/FormulaOperation.model';

@Injectable()
export class FormulaOperationService {
  constructor(
    @InjectModel(FormulaOperation)
    private readonly formulaOperation: typeof FormulaOperation,
  ) {}

  async getOperations(formulaId: number): Promise<string[]> {
    const operations: string[] = [];
    (
      await this.formulaOperation.findAll({ where: { formulaId: formulaId } })
    ).map((operation) => {
      operations.push(operation.operation);
    });
    return operations;
  }
}
