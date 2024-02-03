import { User } from 'src/users/entities/user.entity';

export class CreateTodoDto {
  name: string;
  description: string;
  isDone: boolean;
  user: User;
}
