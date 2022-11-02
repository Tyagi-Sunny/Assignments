import {Entity, hasMany, model, property} from '@loopback/repository';
import {Permissions} from 'loopback4-authorization';
import {User} from './user.model';

@model()
export class Role extends Entity implements Permissions<string> {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  key: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @hasMany(() => User, {keyTo: 'rid'})
  users: User[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  permissions: string[];

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
