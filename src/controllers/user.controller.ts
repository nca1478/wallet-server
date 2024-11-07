import { SoapError } from "../errors";
import { BadRequestException } from "../exceptions";
import { UserService } from "../services";
import { UserValidation } from "../utils";

export class UserController {
  private userService = new UserService();
  private soapError = new SoapError();

  async createUser(args: any) {
    try {
      const body = await UserValidation.validate(args).catch((error) => {
        throw new BadRequestException(error);
      });

      return this.userService.createUser(body as Partial<any>);
    } catch (error: any) {
      this.soapError.handle(error);
    }
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
