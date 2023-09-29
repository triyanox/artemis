import Interpreter from '..';
import { Node } from '@artemis-lang/parser';
import Environment from '../../env';

class Fn {
  args: string[];
  body: Node[];
  env: Environment;

  constructor(args: string[], body: Node[], env: Environment) {
    this.args = args;
    this.body = body;
    this.env = env;
  }

  call(args: any[]): any {
    const fnEnv = new Environment(this.env);
    this.args.forEach((arg, index) => {
      fnEnv.set(arg, args[index]);
    });
    const interpreter = new Interpreter();
    const call = interpreter.visitProgram(
      {
        type: 'Program',
        body: this.body
      },
      fnEnv
    );

    if (fnEnv.getReturn() !== undefined) {
      this.env.setToParent('return', fnEnv.getReturn());
      return fnEnv.getReturn();
    } else {
      try {
        const val = this.env.get('return');
        this.env.setToParent('return', val);
        return val;
      } catch {
        return call;
      }
    }
  }
}

export default Fn;
