import { Entity, Column, BeforeInsert, OneToOne, JoinColumn } from "typeorm";
import { ColumnCommon, User } from "./index";

@Entity("customers")
export class Customer extends ColumnCommon {
  @Column("varchar")
  name!: string;

  @Column("varchar", { unique: true })
  email!: string;

  @Column("varchar")
  cellular!: string;

  @Column("varchar")
  dni!: string;

  @BeforeInsert()
  async emailToLowerCase() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn()
  user!: User;
}
