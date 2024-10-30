import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from 'src/core/service/auth.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'todoapp',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
