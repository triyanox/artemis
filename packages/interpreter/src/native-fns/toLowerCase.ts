import NativeFn from './native-fn';

const toLowerCase = new NativeFn('toLowerCase', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "toLowerCase function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "toLowerCase function"');
  }
  return args[0].toLowerCase();
});

export default toLowerCase;
