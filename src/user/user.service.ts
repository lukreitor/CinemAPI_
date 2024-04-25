import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-profile.dto';
import { UpdateUserDto } from './dto/update-user-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/User.entity';
import * as bcrypt from 'bcrypt';
import { EmailAlreadyInUseException } from 'src/exceptions/EmailAlreadyInUseException';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    console.log(user);
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.remove(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new EmailAlreadyInUseException();
    }

    if (!password) {
      throw new Error('Password is required');
    }

    const user = new UserEntity();
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    return this.userRepository.save(user);
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
}
