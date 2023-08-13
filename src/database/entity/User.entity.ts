import { Column, Entity, Unique } from 'typeorm';
import { Base } from './Base';

@Entity()
@Unique(['email'])
export class User extends Base {
  @Column()
  email: string;

  @Column()
  password: string;
}
