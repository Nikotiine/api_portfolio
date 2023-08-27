import { BeforeInsert, Column, Entity, OneToMany, Unique } from 'typeorm';
import { Base } from './Base';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../enum/UserRole.enum';
import { Like } from './Like.entity';
import { Comment } from './Comment.entity';

@Entity()
@Unique(['username'])
export class User extends Base {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
