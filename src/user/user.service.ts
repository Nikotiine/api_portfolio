import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../database/entity/User.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from '../dto/UserRegister.dto';
import { UserProfileDto } from '../dto/UserProfile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async createUser(user: UserRegisterDto): Promise<UserProfileDto> {
    const isExist = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (isExist) {
      throw new BadRequestException('001');
    }
    const entity = this.userRepository.create({
      username: user.username,
      password: user.password,
    });
    const created = await this.userRepository.save(entity);

    return {
      id: created.id,
      username: created.username,
      role: created.role,
    };
  }
  public async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      username: username,
      isActive: true,
    });
  }
  public async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({
      id: id,
      isActive: true,
    });
  }
}
