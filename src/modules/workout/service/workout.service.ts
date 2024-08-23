import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as CircuitBreaker from 'opossum';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { IWorkOutRepository } from '../interface/workout-repository.interface';
import { IWorkOut } from '../../database/entities/workout.entity';

// Configure axios retry logic
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

@Injectable()
export class WorkoutService {
  private readonly logger = new Logger(WorkoutService.name);

  private circuitBreakerOptions = {
    timeout: 5000, // Timeout for a single request
    errorThresholdPercentage: 50, // Open the circuit after 50% failures
    resetTimeout: 30000, // Time to wait before trying again
  };

  // Circuit breaker setup
  private breaker = new CircuitBreaker(axios.put, this.circuitBreakerOptions);

  constructor(
    @Inject('IWorkOutRepository')
    private readonly workoutRepository: IWorkOutRepository,
  ) {
    this.breaker.on('open', () => this.logger.warn('Circuit breaker opened!'));
    this.breaker.on('halfOpen', () =>
      this.logger.warn('Circuit breaker half-open, trying request...'),
    );
    this.breaker.on('close', () =>
      this.logger.log('Circuit breaker closed, requests are going through.'),
    );
  }

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

  // New method to associate workouts with a user
  async associateWorkoutsWithUser(
    userId: string,
    workoutIds: string[],
  ): Promise<void> {
    try {
      // Using circuit breaker to make a PUT request
      const response = await this.breaker.fire(
        `http://user-management-service:3000/users/${userId}/workouts`,
        { workoutIds },
      );

      if (response.status !== 200) {
        throw new HttpException(
          'Failed to update user profile with workout plans',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (err) {
      this.logger.error(`Error associating workouts with user: ${err.message}`);
      this.handleServiceError('associateWorkoutsWithUser', err);
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
