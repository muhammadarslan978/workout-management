import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WorkOut } from './workout.entity';

@Entity({ name: 'progress' })
export class Progress extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  workout_id: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'jsonb' })
  progress_data: {
    weight: number;
    reps: number;
    sets: number;
    [key: string]: any;
  };

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => WorkOut)
  @JoinColumn({ name: 'workout_id' })
  workout: WorkOut;

  constructor(defaults?: Partial<IProgress>) {
    super();
    if (defaults) {
      Object.assign(this, defaults);
    }
  }
}

export interface IProgress {
  progress_id?: string;
  user_id: string;
  workout_id: string;
  date: Date;
  progress_data: {
    weight: number;
    reps: number;
    sets: number;
    [key: string]: any;
  };
  notes?: string;
  created_at?: Date;
}
