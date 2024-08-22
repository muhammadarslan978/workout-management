import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'exercises' })
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  instructions: string;

  @Column({ nullable: true })
  video_url: string;

  @Column('simple-array')
  muscle_groups: string[];

  @Column({ default: false })
  equipment_required: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  constructor(defaults?: IExercise) {
    super();
    if (defaults) {
      Object.assign(this, defaults);
    }
  }
}

export interface IExercise {
  name: string;
  instructions?: string;
  video_url?: string;
  muscle_groups: string[];
  equipment_required?: boolean;
}
