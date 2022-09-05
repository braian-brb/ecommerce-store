import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { ConfigService } from '@nestjs/config';

export interface User {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  _id: string;
}

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendWelcomeEmail(user: User) {
    await this.mailerService.sendMail({
      to: this.configService.get('NODEMAILER_MAIL_ADMIN_ECOMMERCE'),
      from: this.configService.get('NODEMAILER_MAIL'),
      subject: 'Welcome to Ecommerce',
      template: './welcome',
      context: {
        name: user.name,
      },
    });
  }

  async newUserRegisteredEmail(user: User) {
    await this.mailerService.sendMail({
      to: this.configService.get('NODEMAILER_MAIL_ADMIN_ECOMMERCE'),
      from: this.configService.get('NODEMAILER_MAIL'),
      subject: 'New User Registered',
      template: './new-user',
      context: {
        user,
      },
    });
  }

  async newOrderCreatedEmail(order: any) {
    await this.mailerService.sendMail({
      to: this.configService.get('NODEMAILER_MAIL_ADMIN_ECOMMERCE'),
      from: this.configService.get('NODEMAILER_MAIL'),
      subject: 'New Order Registered',
      template: './new-order',
      context: {
        order: order.toJSON(),
      },
    });
  }
}
