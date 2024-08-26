import {
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
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
  @IsOptional()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  workout_id: string;

  @ValidateNested()
  @Type(() => ProgressDataDto)
  progress_data: ProgressDataDto;

  @IsString()
  @IsOptional()
  notes?: string;
}
