import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movement } from '../entities/movement.entity';
import { MovementDto } from '../dtos/movement.dto';
import { MovementType } from '../entities/movementType.enum';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private movementsRepo: Repository<Movement>,
  ) {}

  findByUserId(userId: number, movementType: MovementType, page: number, pageSize: number)
    : Promise<Movement[]> {
      var isBurn = movementType == MovementType.burn;
      console.log('MOVENT TYPE:'+movementType);
      console.log('IS BURN:'+isBurn);
      console.log(movementType !== undefined && { burned: isBurn })
      var object = {
        where: { userId: userId,
          ...(movementType !== undefined && { burned: isBurn }),
        },
        order: {date : 'DESC'},
        skip: page * pageSize,
        take: pageSize
      }
      console.log(object)
      return this.movementsRepo.find({
        where: { userId: userId,
          ...(movementType !== undefined && { burned: isBurn }),
        },
        order: {date : 'DESC'},
        skip: page * pageSize,
        take: pageSize
      });
  }

  findOne(id: number): Promise<Movement> {
    return this.movementsRepo.findOneBy({ id });
  }

  async create(movementDto: MovementDto): Promise<Movement> {
    const movement = this.movementsRepo.create(movementDto);
    return this.movementsRepo.save(movement);
  }
}
