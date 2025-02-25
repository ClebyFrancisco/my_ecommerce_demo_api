import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (!email || !password) {
      throw new BadRequestException('E-mail e senha são obrigatórios.');
    }

    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body() { email, password }) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }
}
