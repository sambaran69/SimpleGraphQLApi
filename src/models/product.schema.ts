import { graphql }           from 'graphql';
import { GraphQLSchema }     from 'graphql';
import { GraphQLInt, GraphQLString, GraphQLFloat } from 'graphql';
import { GraphQLObjectType } from 'graphql';
import { GraphQLNonNull }    from 'graphql';

var productType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: GraphQLInt },
    price: { type: GraphQLFloat },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString }
  }
});

const Product = new GraphQLSchema({
  query: productType
});

export {Product};
