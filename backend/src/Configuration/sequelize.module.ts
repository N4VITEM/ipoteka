import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Config } from './sequelize.config';

@Module({
  imports: [SequelizeModule.forRoot(Config)],
  providers: [],
  controllers: [],
})
export class SequelizeConfigurationModule {}
