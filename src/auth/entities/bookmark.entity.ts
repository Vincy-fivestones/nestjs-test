import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'bookmark' })
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
  createAt: Date;

  @Column({ nullable: true })
  updateAt: Date;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  link: string;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;
}
