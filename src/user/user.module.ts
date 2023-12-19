import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entity/User.entity';
import { MailingModule } from '../mailing/mailing.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), MailingModule],
  exports: [UserService],
})
export class UserModule {}
