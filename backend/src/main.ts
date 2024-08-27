import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { FormulaService } from './Services/Formula.service';
import { VariableService } from './Services/Variable.service';
import { createVariableDTO } from './DTO/Variable.dto';
import { OperationService } from './Services/Operation.service';
import { createOperationDTO } from './DTO/Operation.dto';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });

  await setMath(app);
  await app.listen(3000);
}
bootstrap();

async function setMath(app) {
  const formulaService = app.get(FormulaService);
  const variableService = app.get(VariableService);
  const operationService = app.get(OperationService);

  const variables: createVariableDTO[] = [
    // базовые параметры сделки //
    { name: 'PRICE', isConstant: false },
    { name: 'MIN_PV', isConstant: false },
    { name: 'MIN_PV_RUB', isConstant: false },
    { name: 'CLIENT_MONEY', isConstant: false },
    { name: 'COMPANY_MONEY', isConstant: false },
    { name: 'PV', isConstant: false },
    { name: 'PV_RUB', isConstant: false },
    // Модификаторы //
    { name: 'CREDIT', isConstant: false },
    { name: 'ZERO_COMISSION_LIMIT', isConstant: false },
    { name: 'COMISSION', isConstant: false },
    { name: 'PROGRAM_LIMIT', isConstant: false },
    { name: 'BANK_COMISSION', isConstant: false },
    { name: 'DURATION', isConstant: false },
    { name: 'DURATION_max', isConstant: false },
    { name: 'STAVKA_BASE', isConstant: false },
    { name: 'STAVKA_SUB', isConstant: false },
    { name: 'PAYMENT', isConstant: false },
    { name: 'PAYMENT_SUB', isConstant: false },
    { name: 'PRICE_FACT', isConstant: false },
  ];

  const operations: createOperationDTO[] = [
    { name: '/' },
    { name: '*' },
    { name: '-' },
    { name: '+' },
    { name: '**' },
  ];

  for (const variable of variables) {
    await variableService.add(variable);
  }

  for (const operation of operations) {
    await operationService.add(operation);
  }

  await formulaService.add(
    'Минимальный платеж',
    [
      { name: 'PRICE', isConstant: false },
      { name: 'MIN_PV', isConstant: false },
    ],
    [{ name: '/' }, { name: '*' }],
    'PRICE/100*MIN_PV',
  );
  await formulaService.add(
    'Взнос С3 "Гарантия"',
    [
      { name: 'MIN_PV_RUB', isConstant: false },
      { name: 'CLIENT_MONEY', isConstant: false },
    ],
    [{ name: '-' }],
    'MIN_PV_RUB-CLIENT_MONEY',
  );
  await formulaService.add(
    'Итоговый ПВ',
    [
      { name: 'COMPANY_MONEY', isConstant: false },
      { name: 'CLIENT_MONEY', isConstant: false },
    ],
    [{ name: '+' }],
    'COMPANY_MONEY+CLIENT_MONEY',
  );
  await formulaService.add(
    'Итоговый ПВ в %',
    [
      { name: 'PRICE', isConstant: false },
      { name: 'PV_RUB', isConstant: false },
    ],
    [{ name: '/' }, { name: '*' }],
    'PV_RUB/PRICE*100',
  );
  await formulaService.add(
    'сумма кредитования',
    [
      { name: 'PRICE', isConstant: false },
      { name: 'PV_RUB', isConstant: false },
    ],
    [{ name: '-' }],
    'PRICE-PV_RUB',
  );
  await formulaService.add(
    'аннуитетный платеж',
    [
      { name: 'CREDIT', isConstant: false },
      { name: 'STAVKA', isConstant: false },
      { name: 'DURATION', isConstant: false },
    ],
    [
      { name: '*' },
      { name: '/' },
      { name: '+' },
      { name: '**' },
      { name: '-' },
    ],
    'CREDIT*STAVKA/100/12*((1+STAVKA/100/12)**DURATION)/(((1+STAVKA/100/12)**DURATION)-1)',
  );
}
