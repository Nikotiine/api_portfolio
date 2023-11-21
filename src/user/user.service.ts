import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../database/entity/User.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from '../dto/UserRegister.dto';
import { UserProfileDto } from '../dto/UserProfile.dto';
import { DeleteConfirmationDto } from '../dto/DeleteConfirmation.dto';

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
      //Si le nom d'utlisateur est deja pris retourne une erreur avec le code 001 pour l'affichage dans le front-endnpm run dev
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
      isActive: created.isActive,
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

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async disableUser(id: number): Promise<DeleteConfirmationDto> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: {
        likes: true,
        comments: true,
      },
    });

    user.isActive = !user.isActive;
    user.comments.forEach((com) => (com.isActive = false));
    user.likes.forEach((like) => (like.isActive = false));
    const updateUserProfile = await this.userRepository.save(user);
    return {
      id: updateUserProfile.id,
      deleted: true,
      object: 'User',
    };
  }
}
