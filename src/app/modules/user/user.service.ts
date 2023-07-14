import { IUser } from './user.interface';
import { User } from './user.model';

const getMyprofile = async (userEmail: string): Promise<IUser | null> => {
  const user = await User.findOne({
    email: userEmail,
  });
  const _id = user?._id;

  const result = await User.findById(_id);
  return result;
};

export const UserService = {
  getMyprofile,
};
