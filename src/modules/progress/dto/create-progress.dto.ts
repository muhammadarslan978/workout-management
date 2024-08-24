import {
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProgressDataDto {
  @IsNumber()
  weight: number;

  @IsInt()
  reps: number;

  @IsInt()
  sets: number;

  [key: string]: any;
}

export class CreateProgressDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  workout_id: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ValidateNested()
  @Type(() => ProgressDataDto)
  progress_data: ProgressDataDto;

  @IsString()
  @IsOptional()
  notes?: string;
}
