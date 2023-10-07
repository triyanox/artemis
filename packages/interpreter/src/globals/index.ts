import Interpreter from '..';

const globals = new Map();

globals.set('_', '_');
globals.set('global', global);
globals.set('process', process);

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
