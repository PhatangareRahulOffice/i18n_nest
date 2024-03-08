import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  year: number;
}
