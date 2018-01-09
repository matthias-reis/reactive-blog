const toGraphQLType = require('../toGraphQLType');
const fixture = require('./fixture');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

describe('toGraphQLType()', () => {
  it('throws if a String is provided', () => {
    expect(() => toGraphQLType('articles', 'articles')).toThrowError();
  });

  it('throws if an empty Object is provided', () => {
    expect(() => toGraphQLType('articles', {})).toThrowError();
  });

  it('throws if an empty Array is provided', () => {
    expect(() => toGraphQLType('articles', [])).toThrowError();
  });

  it('returns an array of types with one scalar type', () => {
    const exp = toGraphQLType('articles', { a: 1 });

    expect(exp).toHaveLength(1);
    expect(exp[0]).toBeInstanceOf(GraphQLObjectType);
    expect(exp[0].name).toBe('Articles');
    expect(Object.keys(exp[0].getFields())).toHaveLength(1);
    expect(Object.keys(exp[0].getFields())[0]).toBe('a');
    expect(exp[0].getFields().a.type).toEqual(GraphQLInt);
  });

  it('returns an array of types with more scalar type', () => {
    const exp = toGraphQLType('articles', { a: 1, b: '2' });

    expect(exp).toHaveLength(1);
    expect(exp[0]).toBeInstanceOf(GraphQLObjectType);
    expect(exp[0].name).toBe('Articles');
    expect(Object.keys(exp[0].getFields())).toHaveLength(2);
    expect(Object.keys(exp[0].getFields())[0]).toBe('a');
    expect(Object.keys(exp[0].getFields())[1]).toBe('b');
    expect(exp[0].getFields().a.type).toEqual(GraphQLInt);
    expect(exp[0].getFields().b.type).toEqual(GraphQLString);
  });

  it('returns the correct type when transforming an array of uniform types', () => {
    const exp = toGraphQLType('articles', [1, 2, 3]);

    expect(exp).toHaveLength(1);
    expect(exp[0]).toBeInstanceOf(GraphQLList);
    expect(exp[0].name).toBe('Articles');
  });
});
