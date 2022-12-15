import { Column, Entity, PrimaryGeneratedColumn , ManyToOne} from 'typeorm';
import { User } from 'src/apis/users/entities/user.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  payment: boolean;


  @ManyToOne(() => User)
  user : User;

  
}