import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MailDto } from '../dto/Mail.dto';
import { MailingService } from './mailing.service';

@Controller('api/mailing')
@ApiTags('Mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}
  @Post('contact')
  @ApiBody({
    type: MailDto,
  })
  @ApiOperation({
    summary: 'Post form contact',
    description: "Point d'entrée pour l'envoie du formulaire de contact",
  })
  @ApiCreatedResponse({
    type: Boolean,
    description: "Retourne true en cas de succes / false en cas d'echec",
  })
  public async contact(@Body() email: MailDto): Promise<boolean> {
    return this.mailingService.sendMail(email);
  }
}
