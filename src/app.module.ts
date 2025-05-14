import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [CommonModule, UserModule],
})
export class AppModule {}
