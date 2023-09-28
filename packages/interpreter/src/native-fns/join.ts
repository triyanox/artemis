import NativeFn from './native-fn';

const join = new NativeFn('join', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "join function"`);
  }
  if (!Array.isArray(args[0])) {
    throw new Error('Expected a list as first argument in "join function"');
  }
  if (typeof args[1] !== 'string') {
    throw new Error('Expected a string as second argument in "join function"');
  }
  return args[0].join(args[1]);
});

export default join;
