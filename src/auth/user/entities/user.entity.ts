import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  name: string;

  @Column()
  mobileNo: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  tc: boolean;
}
