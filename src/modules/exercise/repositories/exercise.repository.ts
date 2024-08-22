import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, In } from 'typeorm';
import { IExerciseRepository } from '../interface/exercise-repository.interface';
import { Exercise } from '../../database/entities/exercise.entity';

@Injectable()
export class ExerciseRepository implements IExerciseRepository {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async create(exercise: Partial<Exercise>): Promise<Exercise> {
    const newExercise = this.exerciseRepository.create(exercise);
    return await this.exerciseRepository.save(newExercise);
  }

  async findById(id: string): Promise<Exercise | null> {
    return await this.exerciseRepository.findOne({ where: { id } });
  }

  async findByFlexibleCriteria(
    options: FindOptionsWhere<Exercise>,
  ): Promise<Exercise[]> {
    return await this.exerciseRepository.find({ where: options });
  }

  async findAll(): Promise<Exercise[]> {
    return await this.exerciseRepository.find();
  }

  async findByIds(ids: string[]): Promise<Exercise[]> {
    return await this.exerciseRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
