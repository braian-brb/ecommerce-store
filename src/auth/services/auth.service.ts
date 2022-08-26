import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/users/service/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user.toJSON();
        return rta;
      }
    }
    return null;
  }
}
