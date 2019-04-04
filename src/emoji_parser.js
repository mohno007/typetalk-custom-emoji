export class EmojiParser {
  constructor(emojis) {
    Object.assign(this, { emojis });
  }

  // 呼び出すたびにリセットされる
  get regex() {
    let regex = this.regex;
    if (regex) {
      regex.lastIndex = 0;
      return regex;
    }

    const codeList = this.emojis.codeList();
    return (this.regex = new RegExp(`:(${codeList.join('|')}):`, 'g'));
  }

  *parse(text) {
    const regex = this.regex;

    for (;;) {
      const match = regex.exec(text);

      if (!match) break;

      yield {
        key: match[1],
        leftEndIndex: match.index - 1,
        rightFirstIndex: regex.lastIndex,
      };
    }
  }
}
