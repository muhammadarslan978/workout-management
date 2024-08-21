import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateWorkoutDto, ExerciseDto } from '../dto/create-workout.dto';
import { IWorkOutRepository } from '../interface/workout-repository.interface';
import { Exercise } from '../interface/workout.interface';
import { IWorkOut } from '../../database/entities/workout.entity';

@Injectable()
export class WorkoutService {
  private readonly logger = new Logger(WorkoutService.name);
  constructor(
    @Inject('IWorkOutRepository')
    private readonly workoutRepository: IWorkOutRepository,
  ) {}

  async addWorkout(data: CreateWorkoutDto): Promise<IWorkOut> {
    try {
      const existingWorkouts =
        await this.workoutRepository.findByFlexibleCriteria({
          title: data.title,
        });
      if (existingWorkouts.length > 0) {
        throw new HttpException('Workout already exists', HttpStatus.CONFLICT);
      }
      data.exercises = this.addUuidToExercises(data.exercises);
      return await this.workoutRepository.create(data);
    } catch (err) {
      this.handleServiceError('addWorkout', err);
    }
  }

  addUuidToExercises(exercises: ExerciseDto[]): Exercise[] {
    return exercises.map((exercise) => ({
      ...exercise,
      exercise_id: uuidv4(),
    }));
  }

  private handleServiceError(method: string, err: any): never {
    this.logger.error(`Error in ${method}:`, err.stack || err);

    if (err instanceof HttpException) {
      throw err;
    }

    throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
