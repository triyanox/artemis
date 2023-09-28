import { Token } from 'moo';

const debug = true;

function error(message: string, token: Token, input: string) {
  const lines = input.split('\n');
  const line = lines[token.line - 1];
  const col = token.col;
  const arrow = ' '.repeat(col - 1) + '^';

  if (debug) {
    throw new Error(
      `Artemis Parser Error: ${message} at line ${token.line} column ${token.col}\n${line}\n${arrow}`
    );
  }

  console.error(
    `Artemis Parser Error: ${message}\nat line ${token.line} column ${token.col}\n${line}\n${arrow}`
  );
  process.exit(1);
}

export default error;
