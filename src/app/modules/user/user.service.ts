import { IUser } from './user.interface';
import { User } from './user.model';

const getMyprofile = async (userPhoneNumber: string): Promise<IUser | null> => {
  const user = await User.findOne({
    phoneNumber: userPhoneNumber,
  });
  const _id = user?._id;

  const result = await User.findById(_id);
  return result;
};

export const UserService = {
  getMyprofile,
};
