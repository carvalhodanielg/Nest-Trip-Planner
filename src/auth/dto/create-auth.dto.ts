import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class SignUpDto extends CreateUserDto {}

export class SignInDto {
  email: string;
  password: string;
}
