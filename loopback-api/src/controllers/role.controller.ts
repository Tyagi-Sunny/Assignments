import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {Role} from '../models';
import {RoleRepository} from '../repositories';

export class RoleController {
  constructor(
    @repository(RoleRepository)
    public roleRepository: RoleRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['CreateRoles']})
  @post('/roles')
  @response(200, {
    description: 'Role model instance',
    content: {'application/json': {schema: getModelSchemaRef(Role)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Role, {
            title: 'NewRole',
          }),
        },
      },
    })
    role: Role,
  ): Promise<Role> {
    return this.roleRepository.create(role);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['GetRolesCount']})
  @get('/roles/count')
  @response(200, {
    description: 'Role model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Role) where?: Where<Role>): Promise<Count> {
    return this.roleRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['GetRoles']})
  @get('/roles')
  @response(200, {
    description: 'Array of Role model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Role, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Role) filter?: Filter<Role>): Promise<Role[]> {
    return this.roleRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['UpdateRoles']})
  @patch('/roles')
  @response(200, {
    description: 'Role PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Role, {partial: true}),
        },
      },
    })
    role: Role,
    @param.where(Role) where?: Where<Role>,
  ): Promise<Count> {
    return this.roleRepository.updateAll(role, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['GetRoleById']})
  @get('/roles/{id}')
  @response(200, {
    description: 'Role model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Role, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Role, {exclude: 'where'}) filter?: FilterExcludingWhere<Role>,
  ): Promise<Role> {
    return this.roleRepository.findById(id, filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['UpdateRoleById']})
  @patch('/roles/{id}')
  @response(204, {
    description: 'Role PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Role, {partial: true}),
        },
      },
    })
    role: Role,
  ): Promise<void> {
    await this.roleRepository.updateById(id, role);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['UpdateRoleById']})
  @put('/roles/{id}')
  @response(204, {
    description: 'Role PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() role: Role,
  ): Promise<void> {
    await this.roleRepository.replaceById(id, role);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['DeleteRoleById']})
  @del('/roles/{id}')
  @response(204, {
    description: 'Role DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.roleRepository.deleteById(id);
  }
}
