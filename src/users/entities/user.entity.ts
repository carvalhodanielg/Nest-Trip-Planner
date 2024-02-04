import { Exclude } from 'class-transformer';
import { Todo } from 'src/todos/entities/todo.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
    console.log('this', this.email);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  birthDate: Date;

  @OneToMany(() => Todo, (todo) => todo.user)
  @JoinColumn()
  todos: Todo[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
