import NodeType from '../node/node-types';

interface Node {
  type: keyof typeof NodeType;
}

export default Node;
