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

  describe('findAll()', () => {
    it('should get all users', () => {
      const users: User[] = [
        { id: 1, name: 'Taro' },
        { id: 2, name: 'Jiro' },
      ];

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return users;
      });

      expect(controller.findAll()).resolves.toEqual(users);
    });
  });

  describe('findOne()', () => {
    it('should successfully get one user', () => {
      const user: User = { id: 1, name: 'Taro' };

      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        return user;
      });

      expect(service.findOne(1)).resolves.toEqual(user);
    });
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

  describe('update()', () => {
    it('should successfully update one user', () => {
      const user = { id: 1, name: '二郎' };

      jest.spyOn(service, 'update').mockImplementation(async () => {
        return user;
      });

      expect(service.update(1, { name: '二郎' })).resolves.toEqual(user);
    });

    it('should fail to update', () => {
      jest.spyOn(service, 'update').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(service.update(2, { name: '二郎' })).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });

  describe('remove()', () => {
    it('should successfully delete one user', () => {
      const user = { raw: [], affected: 1 };

      jest.spyOn(service, 'remove').mockImplementation(async () => {
        return user;
      });

      expect(service.remove(1)).resolves.toEqual(user);
    });

    it('should fail to delete', () => {
      jest.spyOn(service, 'remove').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(service.remove(2)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });
});
