import Interpreter from '..';
import { Node } from '@artemis-lang/parser';
import Environment from '../../env';

class Match {
  condition: Node;
  value: Map<any, any>;
  env: Environment;

  constructor(condition: Node, value: Map<any, any>, env: Environment) {
    this.condition = condition;
    this.value = value;
    this.env = env;
  }

  visitMapKeys(map: Map<any, any>): any[] {
    const interpreter = new Interpreter();
    const keys = Array.from(map.keys());
    this.value = new Map(keys.map((key) => [interpreter.visit(key, this.env), map.get(key)]));
    return keys.map((key) => interpreter.visit(key, this.env));
  }

  call(): any {
    const interpreter = new Interpreter();
    const refValue = interpreter.visit(this.condition as Node, this.env);
    const keys = this.visitMapKeys(this.value);
    const matchKey = keys.find((key) => key === refValue);

    if (matchKey) {
      const call = interpreter.visit(this.value.get(matchKey), this.env);

      if (this.env.getReturn() !== undefined) {
        return this.env.setToParent('return', this.env.getReturn());
      } else {
        return call;
      }
    } else {
      const defaultKey = keys.find((key) => key === '_');
      if (defaultKey) {
        const call = interpreter.visit(this.value.get(defaultKey), this.env);

        if (this.env.getReturn() !== undefined) {
          return this.env.setToParent('return', this.env.getReturn());
        } else {
          return call;
        }
      }
    }

    throw new Error(`No match for '${refValue}'`);
  }
}

export default Match;
