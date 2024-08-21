import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { WorkoutModule } from './modules/workout/workout.module';

@Module({
  imports: [DatabaseModule, WorkoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
