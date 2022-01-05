import { Injectable, Logger } from '@nestjs/common';
import { UserDTO } from '../dto/user-dtos';


@Injectable()
export class UserMockService {

  private logger: Logger = new Logger(UserMockService.name);

  constructor() {}

  findUserProfileByEmail = async (
    email: string,
  ): Promise<UserDTO> => {
    const user = new UserDTO();
    user.firstName = 'First name for testing purpose';
    user.lastName = 'Last name for testing purpose';
    user.email = email;
    user.language = 'fr';

    return user;
  };

  createNewUserProfile = async (
    newUserProfile: UserDTO,
  ): Promise<UserDTO> => {
    return {
      ...newUserProfile,
    };
  };
}
