import { Module } from '@nestjs/common';
import { ProgressController } from './controller/progress.controller';
import { ProgressService } from './service/progress.service';
import { WorkoutModule } from '../workout/workout.module';
import { ProgressRepository } from './repository/progress.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Progress } from '../database/entities/progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Progress]), WorkoutModule, AuthModule],
  controllers: [ProgressController],
  providers: [
    ProgressService,
    {
      provide: 'IProgressRepository',
      useClass: ProgressRepository,
    },
  ],
})
export class ProgressModule {}
