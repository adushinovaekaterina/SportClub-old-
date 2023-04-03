import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {Event} from './entities/event.entity'
import { Level, Type } from './enums/enums';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)  // user //,
    private readonly eventsRepository: Repository<Event>,
  ) { }

  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAllExternal(): Promise<Event[]> {
    return this.eventsRepository
      .createQueryBuilder("events")
      .orderBy("events.dateStart")
      .where("events.type = :type", { type: "Внешнее" })
      .getMany()
  }


  findAllEvents(type:Type, level:Level): Promise<Event[]> {

    return this.eventsRepository
    .createQueryBuilder("events")
    // .where("events.type = :type", { type: type })
    .getMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
