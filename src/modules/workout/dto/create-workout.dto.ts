import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsInt,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WorkoutLevel } from '../../../constant/enum';

export class ExerciseDto {
  @IsUUID()
  @IsOptional()
  exercise_id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  reps: number;

  @IsInt()
  @IsNotEmpty()
  sets: number;

  @IsString()
  @IsNotEmpty()
  instructions: string;
}

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
  @ValidateNested({ each: true })
  @Type(() => ExerciseDto)
  @ArrayMinSize(1)
  exercises: ExerciseDto[];
}
