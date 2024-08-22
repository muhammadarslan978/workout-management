import { Controller, Get, Post, Body } from '@nestjs/common';
import { Exercise } from '../../database/entities/exercise.entity';
import { ExerciseService } from '../service/exercise.service';
import { CreateExerciseDto } from '../dto/create-exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  async listExercises(): Promise<Exercise[]> {
    return this.exerciseService.findAll();
  }

  @Post()
  async createExercise(
    @Body() createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise> {
    return this.exerciseService.create(createExerciseDto);
  }
}
