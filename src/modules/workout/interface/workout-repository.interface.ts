import { WorkOut } from '../../database/entities/workout.entity';
import { FindOptionsWhere } from 'typeorm';

export interface IWorkOutRepository {
  // Create a new workout
  create(workout: Partial<WorkOut>): Promise<WorkOut>;

  // Find workouts based on a flexible object containing any properties from WorkOut
  findByFlexibleCriteria(
    criteria: FindOptionsWhere<WorkOut>,
  ): Promise<WorkOut[]>;

  // Find a workout by its ID
  findById(id: string): Promise<WorkOut | null>;

  // Find all workouts with optional filters
  findAll(filters?: FindOptionsWhere<WorkOut>): Promise<WorkOut[]>;

  // Update a workout by its ID
  update(id: string, workout: Partial<WorkOut>): Promise<WorkOut | null>;

  // Delete a workout by its ID
  delete(id: string): Promise<void>;

  // Count the total number of workouts
  count(filters?: FindOptionsWhere<WorkOut>): Promise<number>;

  // Find workouts with pagination and optional filters
  findPaginated(
    page: number,
    limit: number,
    filters?: FindOptionsWhere<WorkOut>,
  ): Promise<{ data: WorkOut[]; total: number }>;

  // Find workouts by level with aggregation (e.g., grouping by type)
  findByLevelWithAggregation(
    level: 'Beginner' | 'Intermediate' | 'Advanced',
  ): Promise<{ type: string; count: number }[]>;

  // Find workouts with a specific type and return only selected fields
  findByTypeWithFields(
    type: string,
    fields: (keyof WorkOut)[],
  ): Promise<Partial<WorkOut>[]>;

  // Find workouts by their creation date range
  findByDateRange(startDate: Date, endDate: Date): Promise<WorkOut[]>;

  // Perform custom aggregation (e.g., average duration by level)
  aggregateAverageDurationByLevel(): Promise<
    {
      level: 'Beginner' | 'Intermediate' | 'Advanced';
      averageDuration: number;
    }[]
  >;

  // Find workouts with a specific exercise and return detailed information
  findByExercise(exerciseName: string): Promise<WorkOut[]>;

  // Find the most recent workout
  findMostRecent(): Promise<WorkOut | null>;
}
