import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { IUsersServiceCreate, IUsersServiceFindOne, IUsersServiceUpdate } from "./interfaces/users-service.interface";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne({ userId }: IUsersServiceFindOne): Promise<User>;
    create({ email, hashedPassword, name, age, }: IUsersServiceCreate): Promise<User>;
    update({ user, updateUserInput }: IUsersServiceUpdate): Promise<User>;
    delete({ userId }: {
        userId: any;
    }): Promise<boolean>;
    restore({ userId }: {
        userId: any;
    }): Promise<boolean>;
}
