export class EmojiParser {
  constructor(emojiRegistry) {
    Object.assign(this, {
      emojiRegistry: emojiRegistry.clone(), // 防衛的コピー
    });
  }

  // 呼び出すたびにリセットされる
  get regex() {
    let regex = this.regex;
    if (regex) {
      regex.lastIndex = 0;
      return regex;
    }

    const codeList = this.emojiRegistry.codeList();
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
