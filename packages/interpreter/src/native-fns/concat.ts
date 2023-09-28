import NativeFn from './native-fn';

const concat = new NativeFn('concat', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "concat function"`);
  }
  if (!Array.isArray(args[0]) && typeof args[0] !== 'string') {
    throw new Error('Expected a list or string as first argument in "concat function"');
  }
  if (!Array.isArray(args[1]) && typeof args[1] !== 'string') {
    throw new Error('Expected a list or string as second argument in "concat function"');
  }
  if (typeof args[0] === 'string' && typeof args[1] === 'string') {
    return args[0] + args[1];
  }
  if (typeof args[0] === 'string' && Array.isArray(args[1])) {
    return args[0] + args[1].join('');
  }
  if (Array.isArray(args[0]) && typeof args[1] === 'string') {
    return args[0].join('') + args[1];
  }
  if (Array.isArray(args[0]) && Array.isArray(args[1])) {
    return args[0].concat(args[1]);
  }
});

export default concat;
