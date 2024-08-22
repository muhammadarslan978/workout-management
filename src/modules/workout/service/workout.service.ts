import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { IWorkOutRepository } from '../interface/workout-repository.interface';

import { IWorkOut } from '../../database/entities/workout.entity';

@Injectable()
export class WorkoutService {
  private readonly logger = new Logger(WorkoutService.name);
  constructor(
    @Inject('IWorkOutRepository')
    private readonly workoutRepository: IWorkOutRepository,
  ) {}

  async addWorkout(
    trainerId: string,
    data: CreateWorkoutDto,
    exercises: any,
  ): Promise<IWorkOut> {
    try {
      const existingWorkouts =
        await this.workoutRepository.findByFlexibleCriteria({
          title: data.title,
        });
      if (existingWorkouts.length > 0) {
        throw new HttpException(
          'Workout already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.workoutRepository.create({
        ...data,
        exercises,
        trainer_id: trainerId,
      });
    } catch (err) {
      this.handleServiceError('addWorkout', err);
    }
  }

  async listWorkouts(): Promise<IWorkOut[]> {
    try {
      const workouts = await this.workoutRepository.findAll();
      return workouts;
    } catch (err) {
      this.handleServiceError('listWorkouts', err);
    }
  }

  private handleServiceError(method: string, err: any): never {
    this.logger.error(`Error in ${method}:`, err.stack || err);

    if (err instanceof HttpException) {
      throw err;
    }

    throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
