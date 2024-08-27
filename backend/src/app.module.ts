import { Module } from '@nestjs/common';
import { SequelizeConfigurationModule } from './Configuration/sequelize.module';
import { FormulaModule } from './Modules/Formula.module';
import { GraphQLConfigurationModule } from './Configuration/GraphQL.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    SequelizeConfigurationModule,
    GraphQLConfigurationModule,
    FormulaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
