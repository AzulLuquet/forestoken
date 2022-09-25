import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UseFilters, UsePipes, ValidationPipe
} from "@nestjs/common";
import { UsersService } from '../services/users.service';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { DefaultErrorFilter } from './default-error.filter';
import { MovementsService } from '../services/movements.service';
import { MovementDto } from '../dtos/movement.dto';
import { WalletsService } from '../services/wallets.service';

@Controller('users')
@UseFilters(new DefaultErrorFilter())
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(
    private usersService: UsersService,
    private movementsService: MovementsService,
    private walletsService: WalletsService,
  ) {}

  @Post()
  async create(@Res() response, @Body() userDto: UserDto) {
    const createdUser: User = await this.usersService.create(userDto);
    await this.createWalletForUser(createdUser);

    return response.status(HttpStatus.OK).json(createdUser);
  }

  @Post('/:id/movements')
  async createMovement(@Req() request, @Res() response, @Body() body) {
    const user = await this.usersService.findOne(request.params.id);
    const movementDto: MovementDto = {
      userId: user.id,
      description: body.description ?? '',
      burned: body.burned ?? false,
      amount: body.amount,
    };

    const movement = await this.movementsService.create(movementDto);
    return response.status(HttpStatus.OK).json(movement);
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const user = await this.usersService.findOne(id);
    return response.status(HttpStatus.OK).json(user);
  }

  @Get()
  async findAll(@Res() response) {
    const users = await this.usersService.findAll();
    return response.status(HttpStatus.OK).json(users);
  }

  /** private **/
  private async createWalletForUser(createdUser: User) {
    const wallet = await this.walletsService.generateAddressFor(createdUser.id);
    createdUser.walletId = wallet.address;
    await this.usersService.save(createdUser);
    this.logger.log(`saved user: ${JSON.stringify(createdUser)}`);
  }
}
