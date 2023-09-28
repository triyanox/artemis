import Interpreter from '..';

const globals = new Map([['_', '_']]);

export default globals;

/**
 * Load globals into the interpreter.
 */
const loadGlobals = (interpreter: Interpreter) => {
  for (const [key, value] of globals) {
    interpreter.global.set(key, value);
  }
};
export { loadGlobals };
