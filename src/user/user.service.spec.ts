import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { UserEntity } from './entities/User.entity';
import { EmailAlreadyInUseException } from 'src/exceptions/EmailAlreadyInUseException';
import { UpdateUserDto } from './dto/update-user-profile.dto';
import { CreateUserDto } from './dto/create-user-profile.dto';
import * as bcrypt from 'bcrypt';
//import { BaseEntity } from './../entities/Base.entity';
describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [new UserEntity()];
      jest.spyOn(userRepository, 'find').mockResolvedValue(result);

      expect(await userService.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should retrieve a user by id', async () => {
      const result = new UserEntity();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(result);

      expect(await userService.findOne('1')).toBe(result);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      await expect(userService.findOne('1')).rejects.toThrow('User not found');
    });
  });

  describe('UserService', () => {
    // ...

    describe('findOne', () => {
      // ...

      it('should throw an error if user is not found', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

        await expect(userService.findOne('1')).rejects.toThrow(
          'User not found',
        );
      });
    });

    describe('update', () => {
      it('should update a user', async () => {
        const user = new UserEntity();
        const updateUserDto = new UpdateUserDto();
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
        jest.spyOn(userRepository, 'save').mockResolvedValue(user);

        expect(await userService.update('1', updateUserDto)).toBe(user);
      });

      it('should throw an error if user is not found', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

        await expect(
          userService.update('1', new UpdateUserDto()),
        ).rejects.toThrow('User not found');
      });
    });

    describe('remove', () => {
      it('should remove a user', async () => {
        const user = new UserEntity();
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
        jest.spyOn(userRepository, 'remove').mockResolvedValue(user);

        expect(await userService.remove('1')).toBe(user);
      });

      it('should throw an error if user is not found', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

        await expect(userService.remove('1')).rejects.toThrow('User not found');
      });
    });

    describe('createUser', () => {
      it('should create a user', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.email = 'test@example.com';
        createUserDto.password = 'password';
        const user = new UserEntity();
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
        jest.spyOn(userRepository, 'save').mockResolvedValue(user);
        jest
          .spyOn(bcrypt, 'hash')
          .mockImplementation(() => Promise.resolve('hashedPassword'));
        expect(await userService.createUser(createUserDto)).toBe(user);
      });

      it('should throw an error if email is already in use', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.email = 'test@example.com';
        createUserDto.password = 'password';
        const existingUser = new UserEntity();
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser);

        await expect(userService.createUser(createUserDto)).rejects.toThrow(
          EmailAlreadyInUseException,
        );
      });

      it('should throw an error if password is not provided', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.email = 'test@example.com';
        createUserDto.password = '';
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

        await expect(userService.createUser(createUserDto)).rejects.toThrow(
          'Password is required',
        );
      });
    });
  });
});
