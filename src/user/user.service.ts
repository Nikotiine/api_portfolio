import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../database/entity/User.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from '../dto/UserRegister.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async createUser(user: UserRegisterDto): Promise<any> {
    const isExist = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (isExist) {
      throw new BadRequestException('Email already used');
    }
    const entity = this.userRepository.create({
      email: user.email,
      password: user.password,
    });
    const created = await this.userRepository.save(entity);
    return {
      email: created.email,
    };
  }
  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email: email,
    });
  }
  public async findById(id: number): Promise<any> {
    const user = await this.userRepository.findOneBy({
      id: id,
    });
    return user;
  }
}
