import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/user.module';
import { EstablishmentsModule } from './modules/establishments/establishments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CommonModule,
    UsersModule,
    EstablishmentsModule,
  ],
})
export class AppModule {}
