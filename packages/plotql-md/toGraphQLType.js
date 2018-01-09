const hint = require('./objectTypeHints');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLUnionType,
  astFromValue
} = require('graphql');

const ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1);

const graphQlTypes = {
  String: GraphQLString,
  Boolean: GraphQLBoolean,
  Int: GraphQLInt,
  Float: GraphQLFloat
};

module.exports = (endpoint, obj) => {
  let res = [];
  const hintedObj = hint(obj);

  if (typeof hintedObj === 'string') {
    throw new Error(
      `toGraphQLType() needs an Object or an Array, ${hintedObj} provided`
    );
  }

  if (Object.keys(obj).length === 0) {
    throw new Error('toGraphQLType() needs a non empty Object or Array');
  }

  if (Array.isArray(hintedObj)) {
    let listType;
    let additionalItems = [];
    if (hintedObj.length === 1) {
      const type =
        typeof hintedObj[0] === 'string'
          ? [graphQlTypes[hintedObj[0]]]
          : module.exports(`${endpoint}0`, hintedObj[0]);
      const [head, ...tail] = type;
      listType = head;
      additionalItems = tail;
    } else {
      const subTypes = [];
      hintedObj.forEach((item, i) => {
        const type =
          typeof item === 'string'
            ? [graphQlTypes[item]]
            : module.exports(`${endpoint}${i}`, item);
        [head, ...tail] = type;
        subTypes.push(head);
        additionalItems = additionalItems.concat(tail);
      });
      listType = GraphQLUnionType({ name: ucFirst(endpoint) types: subTypes});
    }

    return [new GraphQLList(listType), ...additionalItems];
  } else if (Array.isArray(hintedObj) && hintedObj.length === 1) {
    // enum
  } else {
    // object
    const item = {
      name: ucFirst(endpoint),
      fields: {}
    };
    let additionalItems = [];

    Object.keys(hintedObj).forEach(k => {
      if (typeof hintedObj[k] === 'string') {
        // scalar
        item.fields[k] = { type: graphQlTypes[hintedObj[k]] };
      } else {
        // object
        additionalItems = module.exports(ucFirst(k), hintedObj[k]);
        mainItem = additionalItems[0];
        item.fields[k] = { type: mainItem };
      }
    });

    return [new GraphQLObjectType(item), ...additionalItems];
  }
};

/*
const hint = require('./objectTypeHints');
const { GraphQLObjectType, GraphQLString } = require('graphql');

const doIt = (endpoint, obj) => {
  const res = '';
  var userType = new GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: GraphQLString },
      name: { type: GraphQLString }
    }
  });
  console.log(Object.keys(userType));
  console.log(userType._typeConfig);
  const hintedObj = hint(obj);
  return res;
};

doIt('articles');

*/
