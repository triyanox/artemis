import Interpreter from '..';
import { Node } from '@artemis/parser';
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
    try {
      return this.env.get('return');
    } catch {
      return call;
    }
  }
}

export default Fn;
