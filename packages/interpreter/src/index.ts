import Interpreter from './lib';
export default Interpreter;

export * from './env';
export * from './globals';
export { default as nativeFns, loadNative, NativeFn } from './native-fns';
export * from './types';
