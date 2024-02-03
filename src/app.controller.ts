import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  // @Public()
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    // return this.authService.login(req.user);
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
