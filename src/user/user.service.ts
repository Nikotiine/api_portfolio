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
        email: user.email,
      },
    });
    if (isExist) {
      throw new BadRequestException('001');
    }
    const entity = this.userRepository.create({
      email: user.email,
      password: user.password,
    });
    const created = await this.userRepository.save(entity);

    return {
      id: created.id,
      email: created.email,
      role: created.role,
    };
  }
  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email: email,
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
