import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProgramDTO } from 'src/DTO/Program.dto';
import { Bank } from 'src/Models/Bank.model';
import { Program } from 'src/Models/Program.model';
import { ProgramService } from 'src/Services/Program.service';

@Resolver(() => Program)
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  @Query(() => [Program])
  async getAllPrograms(): Promise<Program[]> {
    return this.programService.getAll();
  }

  @Query(() => [Program])
  async getBankPrograms(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Program[]> {
    return this.programService.getAllbyBankId(id);
  }

  @Mutation(() => Program)
  async createProgram(
    @Args('createProgramDTO')
    createProgramDTO: CreateProgramDTO,
  ): Promise<Program> {
    return this.programService.add(createProgramDTO);
  }

  @Mutation(() => Program)
  async fetchProgram(
    @Args('name', { type: () => String }) name: string,
    @Args('variableName', { type: () => String }) variableName: string,
    @Args('value', { type: () => String }) value: string,
  ): Promise<Program> {
    return this.programService.fetch(name, variableName, value);
  }
}
