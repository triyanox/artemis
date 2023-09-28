import NativeFn from './native-fn';

const assertThrows = new NativeFn('assertThrows', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "assertThrows function"`);
  }
  try {
    args[0]();
  } catch (e: any) {
    if (e.message === args[1]) {
      return;
    }
    throw new Error(`Expected error message "${args[1]}", got "${e.message}"`);
  }
  throw new Error(`Expected error, got none`);
});

export default assertThrows;
