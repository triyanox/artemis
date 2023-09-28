import Interpreter from '../lib';

interface INativeFunction<T extends string, U extends any[], R extends any> {
  name: T;
  fn: (interpreter: Interpreter, ...args: U) => R;
}

export default INativeFunction;
