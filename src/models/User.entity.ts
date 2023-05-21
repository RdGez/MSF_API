import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 45 })
  name: string;

  @Column('varchar', { length: 45, unique: true })
  email: string;

  @Column('varchar', { length: 250 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}