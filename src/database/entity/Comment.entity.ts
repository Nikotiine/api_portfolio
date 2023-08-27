import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from './Base';
import { User } from './User.entity';

@Entity()
export class Comment extends Base {
  @Column({ type: 'text' })
  comment: string;
  @ManyToOne(() => User, (user) => user.comments)
  author: User;
  @Column()
  tutorialId: number;
}
