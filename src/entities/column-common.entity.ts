import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export abstract class ColumnCommon {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // @CreateDateColumn()
  // public createdAt!: Date;

  // @UpdateDateColumn()
  // public updatedAt!: Date;

  // @DeleteDateColumn()
  // public deletedAt!: Date;
}
