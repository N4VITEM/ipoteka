import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProgramDTO } from 'src/DTO/Program.dto';
import { Program } from 'src/Models/Program.model';

@Injectable()
export class ProgramService {
  constructor(
    @InjectModel(Program)
    private readonly program: typeof Program,
  ) {}

  async getById(id: number): Promise<Program> {
    return this.program.findOne({ where: { id: id } });
  }

  async getAll(): Promise<Program[]> {
    return this.program.findAll();
  }
  async getAllbyBankId(bankId: number): Promise<Program[]> {
    return this.program.findAll({ where: { bankId: bankId } });
  }

  async fetch(
    name: string,
    variableName: string,
    value: string,
  ): Promise<Program> {
    const program = await this.program.findOne({ where: { name: name } });
    const variables = program.variables;
    variables.find((variable) => variable.name === variableName).definition =
      value;
    program.variables = variables;
    program.changed('variables', true);
    await program.save();
    return program;
  }

  async add(createProgramDTO: CreateProgramDTO): Promise<Program> {
    return Program.create({
      name: createProgramDTO.name,
      variables: createProgramDTO.variables,
      discounts: createProgramDTO.discounts,
      bankId: createProgramDTO.bankId,
    });
  }
}
