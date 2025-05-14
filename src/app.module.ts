import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { UserModule } from './modules/users/user.module';
import { EstablishmentModule } from './modules/establishments/establishment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CommonModule,
    UserModule,
    EstablishmentModule
  ],
})
export class AppModule {}
