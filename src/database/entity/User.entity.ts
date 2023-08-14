import { BeforeInsert, Column, Entity, Unique } from 'typeorm';
import { Base } from './Base';
import * as bcrypt from 'bcrypt';
@Entity()
@Unique(['email'])
export class User extends Base {
  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
