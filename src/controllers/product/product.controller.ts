import { graphql }      from 'graphql';
import { buildSchema, GraphQLSchema }  from 'graphql';
import { Application }  from 'express';
import * as productSchema from '../../models/product.schema';

export class ProductController {
  public schema: GraphQLSchema;

  constructor(
    private _appRef: Application
  ) {
    this._setupSchema();
  }

  public resolve() {
    return ({
      _id: '1',
      username: 'jonDoe',
      password: 'doeTheJon',
      firstName: 'Jon',
      lastName: 'Doe',
    });
  }

  // ***************************************************************************
  // Private methods
  // ***************************************************************************

  private _setupSchema() {
    this.schema = productSchema;
  }

  // ***************************************************************************
}
