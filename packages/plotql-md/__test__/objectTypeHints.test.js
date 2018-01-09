const hint = require('../objectTypeHints');
const fixture = require('./fixture');

describe('objectTypeHints()', () => {
  it('hints a string', () => {
    expect(hint('foo')).toEqual('String');
  });

  it('hints a boolean', () => {
    expect(hint(true)).toEqual('Boolean');
    expect(hint(false)).toEqual('Boolean');
  });

  it('hints an integer', () => {
    expect(hint(42)).toEqual('Int');
  });

  it('hints a float', () => {
    expect(hint(42.42)).toEqual('Float');
  });

  it('hints a function', () => {
    expect(hint(() => {})).toEqual('Function');
  });

  it('hints an object', () => {
    expect(hint({ a: 42 })).toEqual({ a: 'Int' });
  });

  it('hints an object with more than one item', () => {
    expect(hint({ a: 42, b: 'foo' })).toEqual({
      a: 'Int',
      b: 'String'
    });
  });

  it('hints deeply nested objects', () => {
    expect(hint({ a: 42, b: { one: 1, two: 2 } })).toEqual({
      a: 'Int',
      b: { one: 'Int', two: 'Int' }
    });
  });

  it('hints an array of arbitrary types', () => {
    expect(hint([1, 'two', true])).toEqual(['Int', 'String', 'Boolean']);
  });

  it('hints an array of equal scalar types', () => {
    expect(hint([1, 2, 3])).toEqual(['Int']);
  });

  it('hints an array of equal object types', () => {
    expect(hint([{ a: 1 }, { a: 2 }])).toEqual([{ a: 'Int' }]);
  });

  it('hints an array of inequal object types', () => {
    expect(hint([{ a: 1 }, { a: 2, b: 'three' }])).toEqual([
      { a: 'Int', b: 'String' }
    ]);
  });

  it('hints null', () => {
    expect(hint(null)).toEqual(null);
  });

  it('hints complex objects', () => {
    expect(hint(fixture)).toMatchSnapshot();
  });
});
