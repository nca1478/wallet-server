import { UserService } from "../services";

export class UserController {
  private userService = new UserService();

  async createUser(args: any) {
    return this.userService.createUser(args);
  }

  async getUser(args: any) {
    return this.userService.getUser(args.id);
  }

  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  async updateUser(args: any) {
    return this.userService.updateUser(args.id, args);
  }

  async deleteUser(args: any) {
    return this.userService.deleteUser(args.id);
  }
}
