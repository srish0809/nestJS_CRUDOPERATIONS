import { Injectable, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import* as bcrypt from 'bcrypt';
import { query } from 'express';



@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){}

  
async create(createUserDto: CreateUserDto) {
   
    const emailUser=await this.prisma.user.findFirst({where:{email :createUserDto.email}});
    if(emailUser){
      return 'user already exist';
    }
const saltrounds=10;
  const password=await bcrypt.hash(createUserDto.password,saltrounds)
   await this.prisma.user.create({data:{
    first_name:createUserDto.firstName,
    last_name:createUserDto.lastName,
    email:createUserDto.email,
    password:password,
  }});



    return 'user successfully registered';
  }



  async findAll(email:string) {
    if(email){
      return await this.prisma.user.findFirst({where:{email :email}});
    }
const list= await this.prisma.user.findMany();
    return list;

  }
 

 async findOne(id: number) {
    
    return await this.prisma.user.findFirst({where:{id:id}});
  }

 async update(id: number, updateUserDto: UpdateUserDto) {
    const result=await this.prisma.user.findFirst({where:{id:id}})
    if(!result){
return 'user not found';
    }
  return await this.prisma.user.update({where:{id:id},data:updateUserDto})
   
  }

  async remove(id: number) {
    const result=await this.prisma.user.delete({where:{id:id}})
    return result;
  }
}
