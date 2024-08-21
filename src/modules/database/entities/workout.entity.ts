import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkoutLevel } from '../../../constant/enum';

@Entity({ name: 'workouts' })
export class WorkOut extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true }) // Set title as unique
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: WorkoutLevel })
  level: WorkoutLevel;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'jsonb' })
  exercises: {
    exercise_id?: string;
    name: string;
    reps: number;
    sets: number;
    instructions: string;
  }[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  constructor(defaults?: IWorkOut) {
    super();
    if (defaults) {
      Object.assign(this, defaults);
    }
  }
}

export interface IWorkOut {
  workout_id?: string;
  title: string;
  description?: string;
  level: WorkoutLevel;
  type: string;
  duration: number;
  exercises: {
    exercise_id?: string;
    name: string;
    reps: number;
    sets: number;
    instructions: string;
  }[];
  created_at?: Date;
  updated_at?: Date;
}
