import { Controller, Post, Body } from '@nestjs/common';
import { WorkoutService } from '../service/workout.service';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { IWorkOut } from '../../database/entities/workout.entity';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}
  @Post()
  async createNewWorkout(@Body() workout: CreateWorkoutDto): Promise<IWorkOut> {
    return this.workoutService.addWorkout(workout);
  }
}
