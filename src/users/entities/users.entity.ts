import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity: Define Table
@Entity('users')
export class User {
  // Define Primary Key for User
  @PrimaryGeneratedColumn({
    comment: 'アカウントID',
  })
  readonly id: number;

  // Define column
  // @comment: Database's column comment
  // @reference: https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md#column
  @Column({ type: 'varchar', length: 15, comment: 'アカウント名' })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
