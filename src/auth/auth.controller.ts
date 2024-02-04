import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto, SignUpDto } from './dto/create-auth.dto';
import { Public } from 'src/decorators/auth.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { Request as ReqType } from 'express';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
