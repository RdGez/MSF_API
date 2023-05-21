import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Exercise from "./Exercise.entity";
import User from "./User.entity";

@Entity()
export default class Track extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric', { default: 0 })
  weight: number;

  @Column('numeric', { default: 0 })
  reps: number;

  @Column('numeric', { default: 0 })
  sets: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.tracks)
  user: User;

  @OneToOne(() => Exercise)
  @JoinColumn()
  exercise: Exercise;
}
