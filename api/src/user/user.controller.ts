import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user-dtos';

@Controller()
export class UserController {

  private logger: Logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('/v1/user/:email')
  async findOneByEmail(@Param('email') email: string): Promise<UserDTO> {
    this.logger.debug(`Received email ${email}`);

    const user: UserDTO =
      await this.userService.findUserProfileByEmail(email);

    return user;
  }

  @Post('/v1/user')
  async createNewUser(
    @Body() data: { email: string; firstName: string; lastName: string },
  ): Promise<UserDTO> {
    this.logger.debug(
      `Received user data for creation ${JSON.stringify(data, null, 4)}`,
    );
    const newUserProfile: UserDTO =
      await this.userService.createNewUSerProfile({...data, language: 'fr'});

    return newUserProfile;
  }
}
