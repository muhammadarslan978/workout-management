import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { WorkoutService } from '../service/workout.service';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { IWorkOut } from '../../database/entities/workout.entity';
import { ExerciseService } from '../../exercise/service/exercise.service';

@Controller('workout')
export class WorkoutController {
  constructor(
    private readonly workoutService: WorkoutService,
    private readonly exerciseServise: ExerciseService,
  ) {}

  @Post()
  async createNewWorkout(@Body() workout: CreateWorkoutDto): Promise<IWorkOut> {
    const exercises = await this.exerciseServise.findByIds(workout.exerciseIds);
    if (exercises.length !== workout.exerciseIds.length) {
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    }
    return this.workoutService.addWorkout('asdas4484', workout, exercises);
  }

  @Get()
  async getWorkouts(): Promise<IWorkOut[]> {
    return this.workoutService.listWorkouts();
  }
}
