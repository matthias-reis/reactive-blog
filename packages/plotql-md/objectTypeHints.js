// String, Int, Float, Boolean
const TYPES = {
  string: 'String',
  int: 'Int',
  float: 'Float',
  boolean: 'Boolean',
  function: 'Function'
};

const isInt = n => n % 1 === 0;

const isUniformArray = arr => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[0]) return false;
  }
  return true;
};

const isArrayOfObjects = arr =>
  arr.reduce(
    (isObject, item) =>
      isObject &&
      typeof module.exports(item) !== 'string' &&
      !Array.isArray(item),
    true
  );

const hintArray = arr => {
  const res = arr.map(i => module.exports(i));
  if (isUniformArray(res)) {
    return [res[0]];
  }
  if (isArrayOfObjects(res)) {
    return [res.reduce((o, item) => ({ ...o, ...item }), {})];
  }
  return res;
};

module.exports = input => {
  const type = typeof input;

  let res = TYPES[type];
  if (type === 'number') {
    res = isInt(input) ? TYPES.int : TYPES.float;
  }

  if (Array.isArray(input)) {
    res = hintArray(input);
  } else if (input === null) {
    res = null;
  } else if (type === 'object') {
    res = {};
    Object.keys(input).forEach(k => (res[k] = module.exports(input[k])));
  }

  return res;
};
