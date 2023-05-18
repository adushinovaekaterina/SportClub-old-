import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { Function } from '../users/entities/function.entity';
import { UsersService } from '../users/users.service';
import { Requisitions } from './entities/requisition.entity';
import { Form } from 'src/forms/entities/form.entity';
import { UploadsService } from 'src/uploads/uploads.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User, UserFunction, Function, Requisitions, Form])],
  controllers: [TeamsController],
  providers: [TeamsService, UsersService, UploadsService]
})
export class TeamsModule {}
