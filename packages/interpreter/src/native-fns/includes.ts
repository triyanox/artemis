import NativeFn from './native-fn';

const includes = new NativeFn('includes', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "includes function"`);
  }
  if (typeof args[0] !== 'string' && !Array.isArray(args[0])) {
    throw new Error('Expected a string or list as first argument in "includes function"');
  }
  if (typeof args[1] !== 'string' && !Array.isArray(args[1])) {
    throw new Error('Expected a string or list as second argument in "includes function"');
  }
  if (typeof args[0] === 'string' && typeof args[1] === 'string') {
    return args[0].includes(args[1]);
  }
  if (typeof args[0] === 'string' && Array.isArray(args[1])) {
    return args[1].includes(args[0]);
  }
  if (Array.isArray(args[0]) && typeof args[1] === 'string') {
    return args[0].includes(args[1]);
  }
  if (Array.isArray(args[0]) && Array.isArray(args[1])) {
    return args[0].includes(args[1]);
  }
});

export default includes;
