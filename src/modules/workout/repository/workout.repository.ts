import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Between } from 'typeorm';
import { IWorkOutRepository } from '../interface/workout-repository.interface';
import { WorkOut } from '../../database/entities/workout.entity';

@Injectable()
export class WorkoutRepository implements IWorkOutRepository {
  constructor(
    @InjectRepository(WorkOut)
    private readonly workoutRepository: Repository<WorkOut>,
  ) {}

  async create(workout: Partial<WorkOut>): Promise<WorkOut> {
    const wk = this.workoutRepository.create(workout);
    return this.workoutRepository.save(wk);
  }

  async findById(id: string): Promise<WorkOut | null> {
    return this.workoutRepository.findOne({ where: { id } });
  }

  async findAll(filters?: FindOptionsWhere<WorkOut>): Promise<WorkOut[]> {
    return this.workoutRepository.find({ where: filters });
  }

  async update(id: string, workout: Partial<WorkOut>): Promise<WorkOut | null> {
    await this.workoutRepository.update(id, workout);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.workoutRepository.delete(id);
  }

  async count(filters?: FindOptionsWhere<WorkOut>): Promise<number> {
    return this.workoutRepository.count({ where: filters });
  }

  async findPaginated(
    page: number,
    limit: number,
    filters?: FindOptionsWhere<WorkOut>,
  ): Promise<{ data: WorkOut[]; total: number }> {
    const [data, total] = await this.workoutRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async findByLevelWithAggregation(
    level: 'Beginner' | 'Intermediate' | 'Advanced',
  ): Promise<{ type: string; count: number }[]> {
    return this.workoutRepository
      .createQueryBuilder('workout')
      .select('workout.type', 'type')
      .addSelect('COUNT(workout.id)', 'count')
      .where('workout.level = :level', { level })
      .groupBy('workout.type')
      .getRawMany();
  }

  async findByTypeWithFields(
    type: string,
    fields: (keyof WorkOut)[],
  ): Promise<Partial<WorkOut>[]> {
    const selectFields = fields.map((field) => `workout.${field}`).join(', ');
    return this.workoutRepository
      .createQueryBuilder('workout')
      .select(selectFields)
      .where('workout.type = :type', { type })
      .getMany();
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<WorkOut[]> {
    return this.workoutRepository.find({
      where: {
        created_at: Between(startDate, endDate),
      },
    });
  }

  async aggregateAverageDurationByLevel(): Promise<
    {
      level: 'Beginner' | 'Intermediate' | 'Advanced';
      averageDuration: number;
    }[]
  > {
    return this.workoutRepository
      .createQueryBuilder('workout')
      .select('workout.level', 'level')
      .addSelect('AVG(workout.duration)', 'averageDuration')
      .groupBy('workout.level')
      .getRawMany();
  }

  async findByExercise(exerciseName: string): Promise<WorkOut[]> {
    return this.workoutRepository
      .createQueryBuilder('workout')
      .where('workout.exercises @> :exercise', {
        exercise: [{ name: exerciseName }],
      })
      .getMany();
  }

  async findMostRecent(): Promise<WorkOut | null> {
    return this.workoutRepository
      .createQueryBuilder('workout')
      .orderBy('workout.created_at', 'DESC')
      .getOne();
  }

  async findByFlexibleCriteria(
    criteria: FindOptionsWhere<WorkOut>,
  ): Promise<WorkOut[]> {
    return this.workoutRepository.find({ where: criteria });
  }
}
