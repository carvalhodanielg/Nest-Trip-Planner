import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto, SignInDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(payload: CreateUserDto) {
    const { password, ...data } = payload;
    const user = await this.usersService.findByEmail(data.email);

    if (user) {
      throw new BadRequestException('A user with this email already exists.', {
        cause: new Error(),
      });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await this.usersService.create({
        password: hashedPassword,
        ...data,
      });

      return { newUser };
    }
  }

  async signIn(user: User) {
    const payload = { email: user.email, idUser: user.id };
    const { password, ...rest } = user;
    return {
      ...rest,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payloadEmail: string, payloadPassword: string) {
    const user = await this.usersService.findByEmail(
      payloadEmail.toLowerCase(),
    );

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(
      payloadPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password, try again.');
    }

    return user;
  }

  async login(user: any) {
    const dbUser = await this.usersService.findByEmail(user.email);
    const payload = { email: user.email, id: dbUser.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  create(createAuthDto: SignUpDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
