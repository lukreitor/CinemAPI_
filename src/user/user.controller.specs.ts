import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-profile.dto';
import { UpdateUserDto } from './dto/update-user-profile.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
            createUser: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call findOne', async () => {
    const id = 'testId';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call update', async () => {
    const id = 'testId';
    const updateUserDto: UpdateUserDto = {};
    await controller.update(id, updateUserDto);
    expect(service.update).toHaveBeenCalledWith(id, updateUserDto);
  });

  it('should call remove', async () => {
    const id = 'testId';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });

  it('should call register', async () => {
    const createUserDto: CreateUserDto = { email: '3', password: '3' };
    await controller.register(createUserDto);
    expect(service.createUser).toHaveBeenCalledWith(createUserDto);
  });
});
