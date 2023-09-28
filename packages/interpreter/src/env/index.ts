class Environment {
  private values: { [key: string]: any } = {};

  constructor(private parent?: Environment) {}

  set(name: string, value: any): void {
    this.values[name] = value;
  }

  get(name: string): any {
    if (name in this.values) {
      return this.values[name];
    }
    if (this.parent) {
      return this.parent.get(name);
    }
    throw new Error(`Variable '${name}' not found.`);
  }

  getNested(root: string, keys: string[]) {
    let value = this.get(root) as Record<string, any>;
    for (let key of keys) {
      value = value[key];
    }
    return value;
  }
}

export default Environment;
