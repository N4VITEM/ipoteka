import { Args, Int, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CreateBankDTO } from 'src/DTO/Bank.dto';
import { Bank } from 'src/Models/Bank.model';
import { BankService } from 'src/Services/Bank.service';

@Resolver(() => Bank)
export class BankResolver {
  constructor(private readonly bankService: BankService) {}

  @Query(() => [Bank])
  async getAllBanks(): Promise<Bank[]> {
    return this.bankService.getAll();
  }

  @Query(() => Bank)
  async getById(@Args('id', { type: () => Int }) id: number): Promise<Bank> {
    return this.bankService.getById(id);
  }

  @Mutation(() => Bank)
  async createBank(
    @Args('createBankDTO', { type: () => CreateBankDTO })
    createBankDTO: CreateBankDTO,
  ): Promise<Bank> {
    return this.bankService.add(createBankDTO);
  }
}
