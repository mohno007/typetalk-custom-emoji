export class EmojiParser {
  constructor(emojis) {
    Object.assign(this, { emojis });
  }

  // 呼び出すたびにリセットされる
  get regex() {
    let regex = this.re;
    if (regex) {
      regex.lastIndex = 0;
      return regex;
    }

    const codeList = this.emojis.codes();
    return (this.re = new RegExp(`:(${codeList.join('|')}):`, 'g'));
  }

  *parse(text) {
    const regex = this.regex;

    for (;;) {
      const match = regex.exec(text);

      if (!match) break;

      yield {
        emoji: this.emojis.get(match[1]),
        leftEndIndex: match.index - 1,
        rightStartIndex: regex.lastIndex,
      };
    }
  }
}
