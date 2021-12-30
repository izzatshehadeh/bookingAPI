import User from "../models/database/user";
import { IUser } from "../models/interfaces/user";
class AuthService {
  async createUser(data: IUser) {
    try {
      const user = User.build(data);
      await user.save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async findUserByEmail(email: string) {
    return User.findOne({
      email,
    }).exec();
  }
}

export default new AuthService();
