import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {PgDataSource} from '../datasources';
import {Customer, User, UserRelations, Role} from '../models';
import {CustomerRepository} from './customer.repository';
import {RoleRepository} from './role.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly UserCustomer: BelongsToAccessor<
    Customer,
    typeof User.prototype.id
  >;

  public readonly roledetails: BelongsToAccessor<Role, typeof User.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
    @repository.getter('CustomerRepository')
    protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(User, dataSource);
    this.roledetails = this.createBelongsToAccessorFor('roledetails', roleRepositoryGetter,);
    this.registerInclusionResolver('roledetails', this.roledetails.inclusionResolver);
    this.UserCustomer = this.createBelongsToAccessorFor(
      'UserCustomer',
      customerRepositoryGetter,
    );
    this.registerInclusionResolver(
      'UserCustomer',
      this.UserCustomer.inclusionResolver,
    );
  }

  async verifyPassword(username: string, password: string): Promise<User> {
    const user = await super.findOne({where: {username}});
    if (!user) {
      throw new HttpErrors.NotFound('username does not exist');
    }
    const passwordCheck = password === user.password ? true : false;
    if (!passwordCheck) throw new HttpErrors.Unauthorized('wrong password');

    return user;
  }
}
