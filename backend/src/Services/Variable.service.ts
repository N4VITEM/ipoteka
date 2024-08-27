import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Variable } from '../Models/Variable.model';
import { createVariableDTO } from 'src/DTO/Variable.dto';

@Injectable()
export class VariableService {
  constructor(
    @InjectModel(Variable)
    private readonly variable: typeof Variable,
  ) {}

  async getById(id: number): Promise<Variable> {
    return this.variable.findOne({ where: { id: id } });
  }

  async getAll(): Promise<Variable[]> {
    return this.variable.findAll();
  }

  async add(createVariableDTO: createVariableDTO) {
    return Variable.create({
      name: createVariableDTO.name,
      isConstant: createVariableDTO.isConstant,
      definition: createVariableDTO.definition,
    });
  }
}
