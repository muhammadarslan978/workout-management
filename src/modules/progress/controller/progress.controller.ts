import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProgressService } from '../service/progress.service';
import { CreateProgressDto } from '../dto/create-progress.dto';
import { IProgress } from '../../database/entities/progress.entity';
import { UpdateProgressDto } from '../dto/update-progress.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/constants/index';
import { WorkoutService } from '../../workout/service/workout.service';

@Controller('progress')
export class ProgressController {
  constructor(
    private readonly progressService: ProgressService,
    private readonly workoutService: WorkoutService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINER, UserRole.USER, UserRole.ADMIN, UserRole.GUEST)
  async create(
    @Body() progressDto: CreateProgressDto,
    @Req() req: any,
  ): Promise<IProgress | null> {
    progressDto.user_id = req.user._id;
    if (!req.user.selected_workouts.includes(progressDto.workout_id)) {
      throw new HttpException(
        'Invalid workout selected',
        HttpStatus.BAD_REQUEST,
      );
    }
    const workout = await this.workoutService.getWorkout(
      progressDto.workout_id,
    );
    if (!workout) {
      throw new HttpException('Invalid workout', HttpStatus.BAD_REQUEST);
    }
    return this.progressService.createProgress(progressDto);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINER, UserRole.USER, UserRole.ADMIN, UserRole.GUEST)
  async update(
    @Param('id') id: string,
    @Body() progressDto: UpdateProgressDto,
    @Req() req: any,
  ): Promise<IProgress | null> {
    if (
      progressDto.workout_id &&
      !req.user.selected_workouts.includes(progressDto.workout_id)
    ) {
      throw new HttpException(
        'Invalid workout selected',
        HttpStatus.BAD_REQUEST,
      );
    }

    const progress = await this.progressService.getProgress({
      id: id,
      user_id: req.user._id,
    });
    if (!progress) {
      throw new HttpException('Progress not found', HttpStatus.NOT_FOUND);
    }

    return this.progressService.updateProgress(id, progressDto);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINER, UserRole.USER, UserRole.ADMIN, UserRole.GUEST)
  async getProgress(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<IProgress | null> {
    const progress = await this.progressService.getProgressByIdAndUserId(
      id,
      req.user._id,
    );
    if (!progress) {
      throw new HttpException('Progress not found', HttpStatus.NOT_FOUND);
    }
    return progress;
  }
}
