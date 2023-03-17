import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<"user already exist" | "user successfully registered">;
    findAll(email: string): Promise<import(".prisma/client").User | import(".prisma/client").User[]>;
    findOne(id: number): Promise<import(".prisma/client").User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").User | "user not found">;
    remove(id: number): Promise<import(".prisma/client").User>;
}
