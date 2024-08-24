import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Param,
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
    private readonly exerciseService: ExerciseService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINER)
  async create(
    @Body() workout: CreateWorkoutDto,
    @Req() req: any,
  ): Promise<IWorkOut> {
    const { _id } = req.user;
    const exercises = await this.exerciseService.findByIds(workout.exerciseIds);
    this.validateExercises(exercises, workout.exerciseIds);
    return this.workoutService.addWorkout(_id, workout, exercises);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINER, UserRole.USER, UserRole.ADMIN, UserRole.GUEST)
  async list(): Promise<IWorkOut[]> {
    return this.workoutService.listWorkouts();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINER, UserRole.USER, UserRole.ADMIN, UserRole.GUEST)
  async show(@Param('id') workout_id: string): Promise<IWorkOut> {
    return this.workoutService.getWorkout(workout_id);
  }

  private validateExercises(exercises: any[], exerciseIds: string[]): void {
    if (exercises.length !== exerciseIds.length) {
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    }
  }
}
