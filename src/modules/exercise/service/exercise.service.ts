import {
  Injectable,
  Inject,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IExerciseRepository } from '../interface/exercise-repository.interface';
import { Exercise } from '../../database/entities/exercise.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';

@Injectable()
export class ExerciseService {
  private readonly logger = new Logger(ExerciseService.name);
  constructor(
    @Inject('IExerciseRepository')
    private readonly exerciseRepository: IExerciseRepository,
  ) {}

  async findAll(): Promise<Exercise[]> {
    try {
      const exercises = await this.exerciseRepository.findAll();
      return exercises;
    } catch (err) {
      this.logger.error(err);
      this.handleServiceError('findAll', err);
    }
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    try {
      const isExerciseExist =
        await this.exerciseRepository.findByFlexibleCriteria({
          name: createExerciseDto.name,
        });
      if (isExerciseExist.length) {
        throw new HttpException(
          'Exercise already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const exercise = await this.exerciseRepository.create(createExerciseDto);
      return exercise;
    } catch (err) {
      this.handleServiceError('create', err);
    }
  }

  async findByIds(ids: string[]): Promise<Exercise[]> {
    try {
      const exercises = await this.exerciseRepository.findByIds(ids);
      return exercises;
    } catch (err) {
      this.logger.error(err);
      this.handleServiceError('findByIds', err);
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
