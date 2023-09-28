import Interpreter from '../../lib';
import INativeFunction from '../../types/native-function';

class NativeFn<T extends string, U extends any[], R extends any>
  implements INativeFunction<T, U, R>
{
  public name: T;
  public fn: (interpreter: Interpreter, ...args: U) => R;
  constructor(name: T, fn: (interpreter: Interpreter, ...args: U) => R) {
    this.name = name;
    this.fn = fn;
  }
}

export default NativeFn;
