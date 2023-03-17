"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const emailUser = await this.prisma.user.findFirst({ where: { email: createUserDto.email } });
        if (emailUser) {
            return 'user already exist';
        }
        const saltrounds = 10;
        const password = await bcrypt.hash(createUserDto.password, saltrounds);
        await this.prisma.user.create({ data: {
                first_name: createUserDto.firstName,
                last_name: createUserDto.lastName,
                email: createUserDto.email,
                password: password,
            } });
        return 'user successfully registered';
    }
    async findAll(email) {
        if (email) {
            return await this.prisma.user.findFirst({ where: { email: email } });
        }
        const list = await this.prisma.user.findMany();
        return list;
    }
    async findOne(id) {
        return await this.prisma.user.findFirst({ where: { id: id } });
    }
    async update(id, updateUserDto) {
        const result = await this.prisma.user.findFirst({ where: { id: id } });
        if (!result) {
            return 'user not found';
        }
        return await this.prisma.user.update({ where: { id: id }, data: updateUserDto });
    }
    async remove(id) {
        const result = await this.prisma.user.delete({ where: { id: id } });
        return result;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map