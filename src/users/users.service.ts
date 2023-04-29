import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find().catch((e) => {
      throw new InternalServerErrorException(
        `[${e.message}]：ユーザーの取得に失敗しました。`,
      );
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository
      .findOne({ where: { id: id } })
      .then((res) => {
        if (!res) {
          throw new NotFoundException();
        }
        return res;
      });
  }

  async create({ name }: CreateUserDto): Promise<User> {
    return await this.userRepository
      .save({
        name: name,
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          `[${e.message}]：ユーザーの登録に失敗しました。`,
        );
      });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException();
    }

    user.name = updateUserDto.name;
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<DeleteResult> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    return await this.userRepository.delete(user);
  }
}
