import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { IExerciseRepository } from '../interface/exercise-repository.interface';

@Injectable()
export class ExerciseSeederService implements OnModuleInit {
  private readonly logger = new Logger(ExerciseSeederService.name);

  constructor(
    @Inject('IExerciseRepository')
    private readonly exerciseRepository: IExerciseRepository,
  ) {}

  async onModuleInit() {
    await this.seedExercises();
  }

  async seedExercises() {
    const filePath = path.join(
      process.cwd(),
      'src/modules/exercise/seeder/exercises.json',
    );
    const exercises: any[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const exerciseData of exercises) {
      const existingExercise =
        await this.exerciseRepository.findByFlexibleCriteria({
          name: exerciseData.name,
        });

      if (!existingExercise.length) {
        await this.exerciseRepository.create(exerciseData);
      }
    }
    this.logger.log('Exercises loaded successfully');
  }
}
