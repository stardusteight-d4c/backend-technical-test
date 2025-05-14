import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  EstablishmentsModule,
  EstablishmentsRulesModule,
  UsersModule,
} from './modules';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CommonModule,
    UsersModule,
    EstablishmentsModule,
    EstablishmentsRulesModule,
  ],
})
export class AppModule {}
