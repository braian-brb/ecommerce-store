import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User } from '../users/users/entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
// import { error } from 'console';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }

  //logout
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Req() req: Request) {
    return req.logout((error) => console.log(error));
  }
}
