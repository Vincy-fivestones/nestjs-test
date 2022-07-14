import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Bookmark } from './bookmark.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
  createAt: Date;

  @Column({ nullable: true })
  updateAt: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];
}
