import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import AbstractEntity from './AbstractEntity';

enum Blocked {
  true = 'true',
  false = 'false',
}

@Entity({ name: 'users' })
export default class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Length(1, 50)
  @Column()
  name!: string;

  @IsEmail()
  @Length(1, 50)
  @Column()
  email!: string;

  @Length(40, 150)
  @Column()
  hash!: string;

  @Column({ type: 'enum', enum: Blocked, default: Blocked.false })
  blocked!: boolean;

  @Column({ name: 'login_attempts', type: 'integer' })
  attempts!: number;

  @Column({ name: 'last_login_attempt', type: 'timestamp', nullable: true })
  lastLoginAttempt?: Date | null;

  /**
   * Transient properties
   */
  password!: string;

  token!: string;
}
