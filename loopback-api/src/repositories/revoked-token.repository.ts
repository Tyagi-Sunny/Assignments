import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RedisDataSource} from '../datasources';
import {RevokedToken, RevokedTokenRelations} from '../models';

export class RevokedTokenRepository extends DefaultCrudRepository<
  RevokedToken,
  typeof RevokedToken.prototype.token,
  RevokedTokenRelations
> {
  constructor(@inject('datasources.auditdb') dataSource: RedisDataSource) {
    super(RevokedToken, dataSource);
  }
}
