import NativeFn from './native-fn';

type JSString = string;

const js = new NativeFn('js', (_interpreter, code) => {
  try {
    const result = eval(code[0] as JSString);
    return result;
  } catch (error) {
    console.error('Error executing JavaScript code:', error);
    throw error;
  }
});

export default js;
