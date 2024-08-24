import {
  Injectable,
  Inject,
  Logger,
  HttpException,
  HttpStatus,
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
    await this.ensureUniqueWorkout(data.title);
    return this.workoutRepository.create({
      ...data,
      exercises,
      trainer_id: trainerId,
    });
  }

  async listWorkouts(): Promise<IWorkOut[]> {
    return this.workoutRepository.findAll();
  }

  async getWorkout(workout_id: string): Promise<IWorkOut> {
    const workout = await this.workoutRepository.findById(workout_id);
    if (!workout) {
      throw new HttpException('Workout not found', HttpStatus.NOT_FOUND);
    }
    return workout;
  }

  private async ensureUniqueWorkout(title: string): Promise<void> {
    const existingWorkouts =
      await this.workoutRepository.findByFlexibleCriteria({ title });
    if (existingWorkouts.length > 0) {
      throw new HttpException('Workout already exists', HttpStatus.BAD_REQUEST);
    }
  }
}
