import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../database/entity/User.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from '../dto/UserRegister.dto';
import { UserProfileDto } from '../dto/UserProfile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * Creation d'un nouveau profil utilisateur
   * @param user UserProfileDto
   */
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

  /**
   * Retourne le profil utilisateur par son username et si il est actif en bdd
   * @param username String
   */
  public async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      username: username,
      isActive: true,
    });
  }

  /**
   * Retourne l'objet User si il est actif en bdd
   * @param id de l'utilisateur
   */
  public async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({
      id: id,
      isActive: true,
    });
  }

  /**
   * Renvoie la liste de tous les utilisateurs actif ou non
   */
  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Desactive l'utlisateur en passant son status isActive a false
   * @param id l'utlisateur
   */
  public async disableUser(id: number): Promise<User> {
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
    return await this.userRepository.save(user);
  }

  /**
   * Supprime definitevment tout les utilisateurs qui ont un status isActive a false
   */
  public async clearInactiveUser(): Promise<DeleteResult> {
    return this.userRepository.delete({ isActive: false });
  }
}
