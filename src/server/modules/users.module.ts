import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { Movement } from '../entities/movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User, Movement])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}