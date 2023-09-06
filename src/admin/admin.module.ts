import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from '../user/user.module';
import { TutorialModule } from '../tutorial/tutorial.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [UserModule, TutorialModule],
})
export class AdminModule {}
