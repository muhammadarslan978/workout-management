import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProgressModule } from './modules/progress/progress.module';

@Module({
  imports: [
    DatabaseModule,
    WorkoutModule,
    ExerciseModule,
    AuthModule,
    ProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
