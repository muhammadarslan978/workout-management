import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WorkoutService } from '../service/workout.service';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { IWorkOut } from '../../database/entities/workout.entity';
import { ExerciseService } from '../../exercise/service/exercise.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserRole } from '../../auth/constants/index';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('workout')
export class WorkoutController {
  constructor(
    private readonly workoutService: WorkoutService,
    private readonly exerciseServise: ExerciseService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINER)
  async createNewWorkout(
    @Body() workout: CreateWorkoutDto,
    @Req() req: any,
  ): Promise<IWorkOut> {
    const { _id } = req.user;
    const exercises = await this.exerciseServise.findByIds(workout.exerciseIds);
    if (exercises.length !== workout.exerciseIds.length) {
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    }
    return this.workoutService.addWorkout(_id, workout, exercises);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINER, UserRole.USER, UserRole.ADMIN, UserRole.GUEST)
  async getWorkouts(): Promise<IWorkOut[]> {
    return this.workoutService.listWorkouts();
  }
}
