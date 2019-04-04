// Mutable
export class Emojis {
  static of(...emojis) {
    emojis.reduce((map, emoji) => map.set(emoji.code, emoji));
  }

  constructor(map = new Map()) {
    Object.assign(this, { map });
  }

  get(code) {
    this.map.get(code);
  }

  toArray() {
    if (this.array) return this.array;

    return (this.array = [...this.map.values]);
  }
}
