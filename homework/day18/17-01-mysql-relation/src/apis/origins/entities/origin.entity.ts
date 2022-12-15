import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Origin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;


  
}