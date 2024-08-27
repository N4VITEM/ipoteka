import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBankDTO } from 'src/DTO/Bank.dto';
import { Bank } from 'src/Models/Bank.model';

@Injectable()
export class BankService {
  constructor(
    @InjectModel(Bank)
    private readonly bank: typeof Bank,
  ) {}

  async getById(id: number): Promise<Bank> {
    return this.bank.findOne({ where: { id: id } });
  }

  async getAll(): Promise<Bank[]> {
    return this.bank.findAll();
  }

  async add(createBankDTO: CreateBankDTO) {
    console.log(createBankDTO);
    return Bank.create({
      name: createBankDTO.name,
      primaryColor: createBankDTO.primaryColor,
      secondaryColor: createBankDTO.secondaryColor,
    });
  }
}
