import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    // テストモジュールを作成
    // ユーザーサービスクラスに対して、リポジトリのモックを注入する
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

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should create a user', () => {
      const dto: CreateUserDto = {
        name: '太郎',
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async (dto: CreateUserDto) => {
          const user: User = {
            id: 1,
            ...dto,
          };
          return user;
        });

      expect(controller.create(dto)).resolves.toEqual({
        id: 1,
        ...dto,
      });
    });
  });
});
