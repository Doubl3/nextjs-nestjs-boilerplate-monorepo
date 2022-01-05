import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserMockService } from './mock/user.service.mock';


describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useClass(UserMockService)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be able to retrive a user from an email', async () => {
    const user = await service.findUserProfileByEmail(
      'email@test.com',
    );
    expect(user).toBeDefined();
    expect(user.firstName).toBe('First name for testing purpose');
  });
});
