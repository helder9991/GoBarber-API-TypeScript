import { uuid } from 'uuidv4';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFindAllProvidersDTO from '@modules/users//dtos/IFindAllProvidersDTO';

import User from '../../infra/typeorm/entities/Users';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id)
      users = this.users.filter(user => user.id !== except_user_id);

    return users;
  }

  public async save(user: User): Promise<User> {
    const findUser = this.users.findIndex(
      currentUser => currentUser.id === user.id,
    );

    this.users[findUser] = user;

    return user;
  }

  public async create(userData: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), ...userData });

    this.users.push(user);

    return user;
  }
}

export default FakeUsersRepository;
