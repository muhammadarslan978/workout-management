import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { IProgressRepository } from '../interface/progress.interface';
import { Progress } from '../../database/entities/progress.entity';

@Injectable()
export class ProgressRepository implements IProgressRepository {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
  ) {}

  async create(progress: Partial<Progress>): Promise<Progress> {
    const pg = this.progressRepository.create(progress);
    return this.progressRepository.save(pg);
  }

  async findAll(filters?: FindOptionsWhere<Progress>): Promise<Progress[]> {
    return this.progressRepository.find({ where: filters });
  }

  async findById(id: string): Promise<Progress | null> {
    return this.progressRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    workout: Partial<Progress>,
  ): Promise<Progress | null> {
    await this.progressRepository.update(id, workout);
    return this.findById(id);
  }

  async findOneByFlexibleCriteria(
    criteria: Partial<Progress>,
    relations: string[] = [],
  ): Promise<Progress | null> {
    const queryBuilder = this.progressRepository.createQueryBuilder('progress');

    Object.keys(criteria).forEach((key) => {
      const typedKey = key as keyof Progress;
      const paramValue = criteria[typedKey as keyof Partial<Progress>];

      if (paramValue !== undefined) {
        queryBuilder.andWhere(`progress.${typedKey} = :${typedKey}`, {
          [typedKey]: paramValue,
        });
      }
    });

    relations.forEach((relation) => {
      queryBuilder.leftJoinAndSelect(`progress.${relation}`, relation);
    });

    return queryBuilder.getOne();
  }
}
