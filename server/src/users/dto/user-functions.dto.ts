import {Transform, Type} from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UserFunctionDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  function: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  user: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  team: number;

  // additional
  @IsOptional()
  date_create_order: 'ASC' | 'DESC' = 'ASC';

  // user
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  searchTxt: string;
}
