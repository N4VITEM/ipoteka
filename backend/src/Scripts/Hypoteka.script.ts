import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { FormulaService } from '../Services/Formula.service';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const formulaService = appContext.get(FormulaService);

  formulaService.add(
    'Минимальный платеж',
    [
      { name: 'PRICE', isConstant: false },
      { name: 'PRICE', isConstant: false },
    ],
    [{ name: '/' }, { name: '*' }],
    'PRICE/100*MIN_PV',
  );
  formulaService.add(
    'Взнос С3 "Сармат"',
    [
      { name: 'PRICE', isConstant: false },
      { name: 'MIN_PV', isConstant: false },
      { name: 'CLIENT_MONEY', isConstant: false },
    ],
    [{ name: '/' }, { name: '*' }, { name: '-' }],
    'PRICE/100*MIN_PV-CLIENT_MONEY',
  );

  await appContext.close();
}

bootstrap();
