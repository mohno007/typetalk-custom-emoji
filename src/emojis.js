export class Emojis {
  static of(...emojis) {
    const map = emojis.reduce(
      (map, emoji) => map.set(emoji.code, emoji),
      new Map()
    );

    return new this(map);
  }

  constructor(map = new Map()) {
    Object.assign(this, { map });
  }

  get(code) {
    return this.map.get(code);
  }

  merge(other) {
    return new this.constructor(new Map([...this.map, ...other.map]));
  }

  codes() {
    return this.toArray().map(e => e.code);
  }

  toArray() {
    return [...this.map.values()];
  }
}
