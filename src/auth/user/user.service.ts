import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './user-dto/user-dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(userDTO: UserDTO): Promise<User | null> {
    const { name, email, password, mobileNo, tc } = userDTO;
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: email },
      });

      if (existingUser) {
        throw new Error('Email is already registered');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = this.userRepository.create({
        name,
        email,
        mobileNo,
        password: hashedPassword,
        tc,
      });

      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.error('Error registering user:', error); 
      throw new Error('Error registering user');
    }

    // const existingUser = await this.userRepository.findOne({
    //   where: [{ email: email }],
    // });

    // if (existingUser) {
    //   throw new Error('Email is alredy registered');
    // }
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = new User();
    // newUser.name = name;
    // newUser.email = email;
    // newUser.mobileNo = mobileNo;
    // newUser.password = hashedPassword;
    // newUser.tc = tc;

    // try {
    //   await this.userRepository.save(newUser);
    //   return newUser;
    // } catch (error) {
    //   throw new Error('Error registering user');
    // }
  }

  //   async registerUser(userDTO: UserDTO): Promise<User | null> {
  //     const existingUser = await this.userRepository.findOne({
  //       where: [
  //         { email: userDTO.emailOrMobile },
  //         { mobileNo: userDTO.emailOrMobile },
  //       ],
  //     });

  //     if (existingUser) {
  //       throw new Error('Email or mobile number is alredy registered');
  //     }
  //     // hash the password
  //     const hashedPassword = await bcrypt.hash(userDTO.password, 10);

  //     const newUser = new User();
  //     newUser.name = userDTO.name;
  //     newUser.email = userDTO.emailOrMobile;
  //     newUser.password = hashedPassword;
  //     newUser.tc = userDTO.tc;

  //     try {
  //       await this.userRepository.save(newUser);
  //       return newUser;
  //     } catch (error) {
  //       throw new Error('Error registering user');
  //     }
  //   }
}
