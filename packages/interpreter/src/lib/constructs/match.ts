import Interpreter from '..';
import { NodeType } from '@artemis/parser/src';
import Environment from '../../env';

class Match {
  ref: NodeType<'Reference'>;
  value: Map<any, any>;
  env: Environment;

  constructor(ref: NodeType<'Reference'>, value: Map<any, any>, env: Environment) {
    this.ref = ref;
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
    const refValue = this.env.get(this.ref.value);
    const keys = this.visitMapKeys(this.value);
    const matchKey = keys.find((key) => key === refValue);
    const interpreter = new Interpreter();
    if (matchKey) {
      return interpreter.visit(this.value.get(matchKey), this.env);
    } else {
      const defaultKey = keys.find((key) => key === '_');
      if (defaultKey) {
        return interpreter.visit(this.value.get(defaultKey), this.env);
      }
    }
    throw new Error(`No match for '${refValue}'`);
  }
}

export default Match;
