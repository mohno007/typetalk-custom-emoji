export class EmojiParser {
  constructor(emojis) {
    Object.assign(this, { emojis });
  }

  // 呼び出すたびにリセットされる
  // 並行処理プログラミングすると死ぬ
  generateRegex() {
    let regex = this.re;
    if (regex) {
      return new RegExp(regex);
    }

    const codeList = this.emojis.codes();
    return (this.re = new RegExp(`:(${codeList.join('|')}):`, 'g'));
  }

  parseText(text) {
    const gene = this.parse(text);

    const result = [];
    let index = 0;

    for (
      let { done, value } = gene.next();
      !done;
      { done, value } = gene.next()
    ) {
      const { emoji, leftEndIndex, rightStartIndex } = value;

      result.push(text.substring(index, leftEndIndex));
      result.push(emoji);

      index = rightStartIndex;
    }
    result.push(text.substring(index));

    return result;
  }

  *parse(text) {
    const regex = this.generateRegex();

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
