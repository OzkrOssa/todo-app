import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './adapter/user.module';
import { AuthModule } from './adapter/auth.module';
import { TaskModule } from './adapter/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'todo-db',
      port: +process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME || 'defaultUser',
      password: process.env.DB_PASSWORD || 'defaultPass',
      database: process.env.DB_DATABASE || 'defaultDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
