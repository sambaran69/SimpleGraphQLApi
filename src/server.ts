import * as express             from 'express';
import * as graphqlHTTP         from 'express-graphql';
import * as bodyParser          from 'body-parser';
import * as config              from 'config';

import { graphql }              from 'graphql';
import { buildSchema }          from 'graphql';
import { ProductController }    from './controllers/product';

class Server {
  public app: express.Application;

  private _port        : number;
  private _isProduction: boolean;

  /**
   * Constructor of the server.
   *
   * @public
   * @constructor
   * @return {<Server>Object} - returns an instance of the Server class
   */
  constructor() {

    // is application run in production mode?
    this._isProduction = process.env.NODE_ENV === 'production';

    // get port depending on environment
    this._port = config.get('api.listenPort');

    // setup the express app
    this.app = express();

    // setup the Express config
    this._setupConfig();

    // setup the API routes and entry points
    this._setupAPI();

    // listen to to the server
    this.app.listen(this._port, () => {
      console.info(`Server is running under port ${this._port}.`);
    });
  }

  /**
   * Private method to setup the Express configuration.
   *
   * @private
   */
  private _setupConfig() {
    this.app.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
    this.app.use(/\/((?!graphql).)*/, bodyParser.json());
  }

  /**
   * Private method to setup API routes and entry points.
   *
   * @private
   */
  private _setupAPI() {
    const productController = new ProductController(this.app);

    // Construct a schema, using GraphQL schema language
    const schema = buildSchema(`
      ${productController.schema}

      type Query {
        product: Product
      }
    `);

    // The root provides a resolver function for each API endpoint
    const root = {
      product: productController.resolve,
    };

    this.app.use('/graphql', graphqlHTTP({
      schema   : schema,
      rootValue: root,
      pretty   : true,
      graphiql : true,
    }));
  }

  /**
   * Private method to setup the error handler.
   *
   * @private
   */
  private _setupErrorHandling() {
    this.app.use((
        err : Error,
        req : express.Request,
        res : express.Response,
        next: express.NextFunction,
      ) => {
      console.error(err);
      return res.json({ errors: ['Some error occurred!'] });
    });
  }

}

const server = new Server();
