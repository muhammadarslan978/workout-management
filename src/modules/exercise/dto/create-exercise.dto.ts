import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsUrl()
  video_url?: string;

  @IsArray()
  @IsString({ each: true })
  muscle_groups: string[];

  @IsOptional()
  @IsBoolean()
  equipment_required?: boolean;
}
