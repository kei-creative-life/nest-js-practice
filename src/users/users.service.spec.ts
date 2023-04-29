import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    // テスト用のモジュールを作成する
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    // テスト用のモジュールから、UsersServiceを取得する
    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const dto: CreateUserDto = {
        name: '太郎',
      };

      // UsersServiceのcreateをSpy
      jest
        .spyOn(service, 'create')
        .mockImplementation(async (dto: CreateUserDto) => {
          const user: User = {
            id: 1,
            ...dto,
          };
          return user;
        });

      expect(service.create(dto)).resolves.toEqual({
        id: 1,
        ...dto,
      });
    });
  });
});
