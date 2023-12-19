import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from '../dto/Mail.dto';
import * as process from 'process';
import { CommentDto } from '../dto/Comment.dto';
import { Comment } from '../database/entity/Comment.entity';
import { User } from '../database/entity/User.entity';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  /**
   * Envoie de l'email de contact
   * Retourne true ou false si reussite ou echec de l'envoie
   * @param email MailDto
   */
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

  public notifyNewComment(comment: Comment): void {
    this.mailerService.sendMail({
      to: process.env.CONTACT_USERNAME,
      from: process.env.NO_REPLY_ADRESS,
      subject: 'Nouveau commentaire',
      html: `<h4> Nouveau commentaire posté par</h4> 
             <br> 
             <h2> ${comment.author.username}</h2>
             <br> 
             <p> ${comment.comment}</p>
             <br>`,
    });
  }

  public notifyNewUser(user: User): void {
    this.mailerService.sendMail({
      to: process.env.CONTACT_USERNAME,
      from: process.env.NO_REPLY_ADRESS,
      subject: 'Nouvel utilisateur ',
      html: `<h4> Nouvel utilisateur enregistré</h4> 
             <br> 
             <h2> ${user.username} </h2>`,
    });
  }
}
