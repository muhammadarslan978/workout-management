import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { ExerciseModule } from './modules/exercise/exercise.module';

@Module({
  imports: [DatabaseModule, WorkoutModule, ExerciseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
