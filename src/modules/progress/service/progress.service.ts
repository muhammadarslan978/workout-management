import { Inject, Injectable, Logger } from '@nestjs/common';
import { IProgress } from '../../database/entities/progress.entity';
import { CreateProgressDto } from '../dto/create-progress.dto';
import { IProgressRepository } from '../interface/progress.interface';
import { UpdateProgressDto } from '../dto/update-progress.dto';

@Injectable()
export class ProgressService {
  private readonly logger = new Logger(ProgressService.name);
  constructor(
    @Inject('IProgressRepository')
    private readonly progressRepository: IProgressRepository,
  ) {}

  async createProgress(progress: CreateProgressDto): Promise<IProgress> {
    return this.progressRepository.create(progress);
  }

  async updateProgress(
    progress_id: string,
    progress: UpdateProgressDto,
  ): Promise<IProgress | null> {
    return this.progressRepository.update(progress_id, progress);
  }
}
