import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ProgressService } from '../service/progress.service';
import { CreateProgressDto } from '../dto/create-progress.dto';
import { IProgress } from '../../database/entities/progress.entity';
import { UpdateProgressDto } from '../dto/update-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  async create(@Body() progress: CreateProgressDto): Promise<IProgress> {
    return this.progressService.createProgress(progress);
  }

  @Put('/:id')
  async update(
    @Param() id: string,
    @Body() progress: UpdateProgressDto,
  ): Promise<IProgress | null> {
    return this.progressService.updateProgress(id, progress);
  }
}
