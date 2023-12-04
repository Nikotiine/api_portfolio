import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import * as process from 'process';

@Module({
  providers: [MailingService],
  controllers: [MailingController],
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.HOSTNAME,
          secure: false,
          auth: {
            user: process.env.CONTACT_USERNAME,
            pass: process.env.CONTACT_PASSWORD,
          },
        },
      }),
    }),
  ],
})
export class MailingModule {}
