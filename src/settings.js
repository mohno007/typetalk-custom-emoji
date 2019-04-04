export class Settings {
  static default() {
    return new this(null, [], new Map());
  }

  constructor(lastSyncDate, emojiSources, emojis) {
    Object.assign(this, {
      lastSyncDate,
      emojiSources,
      emojis,
    });
  }
}
