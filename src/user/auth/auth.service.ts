import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../Dto/register.dto';
// import { LoginDto } from '../Dto/login.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // private users: Record<string, { email: string; password: string }> = {};

  // registerUser(dto: RegisterDto) {
  //   const { email, password } = dto;
  //   if (this.usersRepository[email]) {
  //     throw new Error('User already exists');
  //   }
  //   this.usersRepository[email] = { email, password };
  //   return 'User registered successfully';
  // }
  async create(Dto: RegisterDto): Promise<User> {
    const user = this.usersRepository.create(Dto);
    return this.usersRepository.save(user);
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // loginUser(dto: LoginDto) {
  //   const { email, password } = dto;
  //   if (
  //     !this.usersRepository[email] ||
  //     this.usersRepository[email].password !== password
  //   ) {
  //     throw new Error('Invalid credentials');
  //   }
  //   return 'User logged in successfully';
  // }
}
