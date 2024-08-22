import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsInt,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { WorkoutLevel } from '../../../constant/enum';

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(WorkoutLevel) // Use the enum here
  @IsNotEmpty()
  level: WorkoutLevel;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  exerciseIds: string[];
}
