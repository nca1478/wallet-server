import { Entity, Column, BeforeInsert, OneToOne } from "typeorm";
import * as bcrypt from "bcrypt";
import { ColumnCommon, Customer } from "./index";

@Entity("users")
export class User extends ColumnCommon {
  @Column("varchar")
  name!: string;

  @Column("varchar")
  email!: string;

  @Column("varchar")
  password!: string;

  private tempPassword!: string;

  @BeforeInsert()
  async transform() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }

    if (this.password && this.password !== this.tempPassword) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @OneToOne(() => Customer, (customer) => customer.user)
  customer!: Customer;
}
