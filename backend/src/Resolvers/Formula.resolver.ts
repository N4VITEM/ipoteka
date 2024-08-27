import { Args, Float, Int, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { createOperationDTO } from '../DTO/Operation.dto';
import { createVariableDTO } from '../DTO/Variable.dto';
import { Formula } from '../Models/Formula.model';
import { FormulaService } from '../Services/Formula.service';
import { OperationService } from '../Services/Operation.service';
import { VariableService } from '../Services/Variable.service';
import { Variable } from 'src/Models/Variable.model';

@Resolver(() => Formula)
export class FormulaResolver {
  private pubSub: PubSub;

  constructor(
    private readonly formulaService: FormulaService,
    private readonly variableService: VariableService,
    private readonly operationService: OperationService,
  ) {
    this.pubSub = new PubSub();
  }

  @Query(() => [Formula])
  async getAll(): Promise<Formula[]> {
    return this.formulaService.getAll();
  }

  @Query(() => [Variable])
  async getAllVariables(): Promise<Variable[]> {
    return this.variableService.getAll();
  }

  @Query(() => Formula)
  async getById(@Args('id', { type: () => Int }) id: number): Promise<Formula> {
    return this.formulaService.getById(id);
  }

  @Mutation(() => Float)
  async calculate(
    @Args('id', { type: () => Int }) id: number,
    @Args('variables', { type: () => [Float] }) variables: number[],
  ): Promise<number> {
    return this.formulaService.calculate(id, variables);
  }

  @Mutation(() => Formula)
  async createFormula(
    @Args('name', { type: () => [String] }) name: string,
    @Args('variables', { type: () => [String] }) variables: createVariableDTO[],
    @Args('operations', { type: () => [String] })
    operations: createOperationDTO[],
    @Args('expression', { type: () => String }) expression: string,
  ): Promise<Formula> {
    return this.formulaService.add(name, variables, operations, expression);
  }
}
