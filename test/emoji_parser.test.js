import { EmojiParser } from '../src/emoji_parser.js';
import { Emojis } from '../src/emojis.js';
import { Emoji } from '../src/emoji.js';
import Assert from 'assert';

describe('EmojiParser', function() {
  const code = 'smiley';
  const url =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEUAAAD+/v7KB/Q9AAAAFklEQVQI12P4z8TALMUAIu2Y2Bj+AwAbxwNogPCregAAAABJRU5ErkJggg==';
  const emoji = new Emoji(code, url);
  const emojis = Emojis.of(emoji);

  const parser = new EmojiParser(emojis);

  describe('#parse', function() {
    it('は、渡された文字列のパース結果を返すジェネレータを返すこと', function() {
      const gene = parser.parse('ABC :smiley: DEF :smiley: EFG');

      Assert(Symbol.iterator in gene);
    });

    it('が返すジェネレータは、絵文字と左側文字列の終了位置、右側文字列の開始位置を返す', function() {
      const gene = parser.parse('ABC :smiley: DEF :smiley: EFG');

      Assert.deepEqual(gene.next(), {
        done: false,
        value: {
          emoji,
          leftEndIndex: 3,
          rightStartIndex: 12,
        },
      });

      Assert.deepEqual(gene.next(), {
        done: false,
        value: {
          emoji,
          leftEndIndex: 16,
          rightStartIndex: 25,
        },
      });

      Assert.deepEqual(gene.next(), {
        done: true,
        value: null,
      });
    });
  });
});
