import { Base } from './Base';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { User } from './User.entity';

@Entity()
@Unique(['tutorialId', 'user'])
export class Like extends Base {
  @Column()
  tutorialId: number;

  @ManyToOne(() => User, (user) => user.likes, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;
}
