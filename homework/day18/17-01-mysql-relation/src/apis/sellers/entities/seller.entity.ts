import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  
}
