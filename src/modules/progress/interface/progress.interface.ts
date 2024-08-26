import { Progress } from '../../database/entities/progress.entity';
import { FindOptionsWhere } from 'typeorm';

export interface IProgressRepository {
  create(progress: Partial<Progress>): Promise<Progress>;

  findAll(filters?: FindOptionsWhere<Progress>): Promise<Progress[]>;

  findById(id: string): Promise<Progress | null>;

  update(id: string, progress: Partial<Progress>): Promise<Progress | null>;

  findOneByFlexibleCriteria(
    criteria: Partial<Progress>,
    relations?: string[],
  ): Promise<Progress | null>;
}
