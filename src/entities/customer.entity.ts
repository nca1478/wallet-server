import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity("customer")
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  cellular!: string;

  @Column()
  dni!: string;

  @BeforeInsert()
  async transform() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }
}
