import {Count} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {CustomerController, UserController} from '../../controllers';
import {Customer, User} from '../../models';
import {CustomerRepository} from '../../repositories';

describe('ProductController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<CustomerRepository>;
  beforeEach(givenStubbedRepository);

  describe('find()', () => {
    it('retrieves all customers', async () => {
      const controller = new CustomerController(repository);
      const storedCustomer = [
        new Customer({
          id: 1,
          name: 'google',
          website: 'google.com',
          address: 'noida',
        }),
        new Customer({
          id: 2,
          name: 'fb',
          website: 'fb.com',
          address: 'noida',
        }),
      ];
      repository.stubs.find.resolves(storedCustomer);

      const customers = await controller.find();
      expect(customers).to.deepEqual(storedCustomer);

      sinon.assert.calledWithMatch(repository.stubs.find);
    });
  });

  describe('count()', () => {
    it('should return the total number of customers', async () => {
      const controller = new CustomerController(repository);

      let c: Count = {
        count: 2,
      };

      repository.stubs.count.resolves(c);

      const count = await controller.count();
      expect(count).to.deepEqual(c);
      sinon.assert.calledWithMatch(repository.stubs.count);
    });
  });

  describe('findById()', () => {
    it('should return the customer with the given id', async () => {
      const controller = new CustomerController(repository);

      const fetchedCustomer: Customer = new Customer({
        id: 1,
        name: 'google',
        website: 'google.com',
        address: 'noida',
      });

      repository.stubs.findById.resolves(fetchedCustomer);

      const customer: Customer = await controller.findById(1);

      expect(customer).to.deepEqual(fetchedCustomer);
      sinon.assert.calledWithMatch(repository.stubs.findById);
    });
  });

  function givenStubbedRepository() {
    repository = createStubInstance(CustomerRepository);
  }
});
