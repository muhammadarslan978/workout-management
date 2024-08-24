import { Module } from '@nestjs/common';
import { ProgressController } from './controller/progress.controller';
import { ProgressService } from './service/progress.service';

@Module({
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
