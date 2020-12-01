import { UserService } from './UserService';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('getUsers', () => {
    it('should return empty user list', () => {
      const users = userService.getUsers();
      expect(users).toMatchSnapshot();
    });

    it('should return user list', () => {
      userService.createUser({ name: 'test' });

      const users = userService.getUsers();
      expect(users).toMatchSnapshot();
    });
  });

  describe('getUserById', () => {
    it('should return user', () => {
      userService.createUser({ name: 'test' });

      const user = userService.getUserById(1);
      expect(user).toMatchSnapshot();
    });

    it('should throw not found exception', () => {
      const fn = () => userService.getUserById(0);
      expect(fn).toThrowErrorMatchingSnapshot();
    });
  });

  describe('createUser', () => {
    it('should return new user', () => {
      const user = userService.createUser({ name: 'Test' });
      expect(user).toMatchSnapshot();
    });
  });

  describe('updateUserById', () => {
    it('should return updated user', () => {
      userService.createUser({ name: 'test' });

      const user = userService.updateUserById(1, { name: 'Update Test' });
      expect(user).toMatchSnapshot();
    });

    it('should throw not found exception', () => {
      const fn = () => userService.updateUserById(0, { name: 'Update Test' });
      expect(fn).toThrowErrorMatchingSnapshot();
    });
  });

  describe('removeUserById', () => {
    it('should remove user', () => {
      const user = userService.createUser({ name: 'test' });
      userService.removeUserById(user.id);
    });

    it('should do nothing when user not exists', () => {
      userService.removeUserById(0);
    });
  });

  describe('validateUserInput', () => {
    it('should do nothing when user is valid', () => {
      userService.validateUserInput({ name: 'test' });
    });

    it('should do throw validation exception', () => {
      const fn = () => userService.validateUserInput({ name: '1' });
      expect(fn).toThrowErrorMatchingSnapshot();
    });
  });
});
