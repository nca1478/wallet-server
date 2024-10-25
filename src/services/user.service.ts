import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";

export class UserService {
  private userRepository = getRepository(User);

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async getUser(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
