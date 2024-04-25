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

  /**
   * The function updates a user entity in a TypeScript application by finding the user by ID, merging
   * the update data, and saving the changes to the repository.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * user whose information needs to be updated.
   * @param {UpdateUserDto} updateUserDto - The `updateUserDto` parameter in the `update` function
   * likely refers to an object containing the data that needs to be updated for a user. It could
   * include properties such as `name`, `email`, `age`, etc., depending on the fields that can be
   * updated for a user in your
   * @returns The `update` method is returning the updated user object after saving the changes made by
   * `Object.assign(user, updateUserDto)`.
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  /**
   * The function removes a user from the repository based on the provided ID after checking if the
   * user exists.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * user that needs to be removed from the database.
   * @returns The `remove` method is returning the result of removing the user from the
   * `userRepository`.
   */
  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    console.log(user);
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.remove(user);
  }

  /**
   * The function `createUser` in TypeScript creates a new user entity after checking for existing
   * users with the same email and hashing the password.
   * @param {CreateUserDto} createUserDto - The `createUserDto` parameter is an object that contains
   * the data needed to create a new user. It typically includes the user's email and password.
   * @returns The `createUser` function is returning a Promise that resolves to a `UserEntity` object
   * after creating a new user with the provided email and hashed password.
   */
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
