import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Operation } from '../Models/Operation.model';
import { createOperationDTO } from 'src/DTO/Operation.dto';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation)
    private readonly operation: typeof Operation,
  ) {}

  async getById(id: number): Promise<Operation> {
    return this.operation.findOne({ where: { id: id } });
  }

  async getAll(): Promise<Operation[]> {
    return this.operation.findAll();
  }

  async add(createOperationDTO: createOperationDTO) {
    return Operation.create({ name: createOperationDTO.name });
  }
}
