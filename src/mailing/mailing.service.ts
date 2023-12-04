import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from '../dto/Mail.dto';
import * as process from 'process';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  public async sendMail(email: MailDto): Promise<boolean> {
    return this.mailerService
      .sendMail({
        to: process.env.CONTACT_USERNAME,
        from: email.email,
        subject: email.object,
        html: `<h4> message envoye de la part de</h4> 
             <br> 
             <h2> ${email.lastName} - ${email.firstName}</h2>
             <br> 
             <p> ${email.message}</p>
             <br> 
             <p> repondre a son mail : ${email.email}</p>`,
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
