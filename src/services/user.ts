import User from "../models/database/user";
import { IUser } from "../models/interfaces/user";
class UserService {
  async findUserByEmail(email: string) {
    return User.findOne({
      email,
    }).exec();
  }
}

export default new UserService();
