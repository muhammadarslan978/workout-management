import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkOut } from '../database/entities/workout.entity';
import { WorkoutService } from './service/workout.service';
import { WorkoutController } from './controller/workout.controller';
import { WorkoutRepository } from './repositories/workout.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkOut])],
  providers: [
    WorkoutService,
    {
      provide: 'IWorkOutRepository',
      useClass: WorkoutRepository,
    },
  ],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
