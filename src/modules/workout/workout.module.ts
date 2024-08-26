import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkOut } from '../database/entities/workout.entity';
import { WorkoutService } from './service/workout.service';
import { WorkoutController } from './controller/workout.controller';
import { WorkoutRepository } from './repository/workout.repository';
import { ExerciseModule } from '../exercise/exercise.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkOut]), ExerciseModule, AuthModule],
  providers: [
    WorkoutService,
    {
      provide: 'IWorkOutRepository',
      useClass: WorkoutRepository,
    },
  ],
  controllers: [WorkoutController],
  exports: [WorkoutService],
})
export class WorkoutModule {}
