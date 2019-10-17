import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import AbstractEntity from './AbstractEntity';

enum Blocked {
  true = 'true',
  false = 'false',
}

@Entity({ name: 'groups' })
export default class Group extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  name!: string;

  @Column({ type: 'enum', enum: Blocked, default: Blocked.false })
  blocked!: boolean;
}
