import { Exercise } from '../../database/entities/exercise.entity';
import { FindOptionsWhere } from 'typeorm';

export interface IExerciseRepository {
  // create a new exercise
  create(exercise: Partial<Exercise>): Promise<Exercise>;

  // exercise find by Id
  findById(id: string): Promise<Exercise | null>;

  //Find exercise based on a flexible object containing any properties from Exercise
  findByFlexibleCriteria(
    options: FindOptionsWhere<Exercise>,
  ): Promise<Exercise[]>;

  findAll(): Promise<Exercise[]>;

  findByIds(ids: string[]): Promise<Exercise[]>;
}
