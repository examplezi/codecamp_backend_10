import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { IUsersServiceCreate, IUsersServiceFindOne } from "./interfaces/users-service.interface";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findOne({ email }: IUsersServiceFindOne): Promise<User>;
    create({ email, hashedPassword: password, name, age, }: IUsersServiceCreate): Promise<User>;
}
