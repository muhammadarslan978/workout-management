import { Module } from '@nestjs/common';
import { ExerciseService } from './service/exercise.service';
import { ExerciseController } from './controller/exercise.controller';
import { ExerciseSeederService } from './seeder/exercise-seeder.service';
import { Exercise } from '../database/entities/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseRepository } from './repository/exercise.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [
    ExerciseService,
    {
      provide: 'IExerciseRepository',
      useClass: ExerciseRepository,
    },
    ExerciseSeederService,
  ],
  controllers: [ExerciseController],
  exports: [ExerciseService],
})
export class ExerciseModule {}
