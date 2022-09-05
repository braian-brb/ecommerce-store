import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { OrderService } from '../orders/orders.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private orderService: OrderService) {}

  // @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.orderService.ordersByUser(user.sub);
  }
}
