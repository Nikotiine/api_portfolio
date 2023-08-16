import { BeforeInsert, Column, Entity, Unique } from 'typeorm';
import { Base } from './Base';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../enum/UserRole.enum';
@Entity()
@Unique(['email'])
export class User extends Base {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
