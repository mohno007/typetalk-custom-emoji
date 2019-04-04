import { Emoji } from '../src/emoji.js';
import { Emojis } from '../src/emojis.js';
import Assert from 'assert';

describe('Emojis', function() {
  describe('.of', function() {
    it('は、Emojisを返す', function() {
      const emoji = new Emoji(
        'smiley',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEUAAAD+/v7KB/Q9AAAAFklEQVQI12P4z8TALMUAIu2Y2Bj+AwAbxwNogPCregAAAABJRU5ErkJggg=='
      );
      const emojis = Emojis.of(emoji);

      Assert(emojis instanceof Emojis);
    });
  });

  describe('#get', function() {
    it('は、絵文字コードに対応するEmojiを返す', function() {
      const emoji = new Emoji(
        'smiley',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEUAAAD+/v7KB/Q9AAAAFklEQVQI12P4z8TALMUAIu2Y2Bj+AwAbxwNogPCregAAAABJRU5ErkJggg=='
      );
      const emojis = Emojis.of(emoji);

      Assert(emojis.get('smiley') === emoji);
    });
  });

  describe('#merge', function() {
    it('は、他のEmojiをマージした新しいEmojisを返す', function() {
      const emojiA = new Emoji(
        'smileyA',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEUAAAD+/v7KB/Q9AAAAFklEQVQI12P4z8TALMUAIu2Y2Bj+AwAbxwNogPCregAAAABJRU5ErkJggg=='
      );
      const emojiB = new Emoji(
        'smileyB',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEUAAAD+/v7KB/Q9AAAAFklEQVQI12P4z8TALMUAIu2Y2Bj+AwAbxwNogPCregAAAABJRU5ErkJggg=='
      );
      const emojisA = Emojis.of(emojiA);
      const emojisB = Emojis.of(emojiB);

      const merged = emojisA.merge(emojisB);

      Assert(merged.get('smileyA') === emojiA);
      Assert(merged.get('smileyB') === emojiB);
    });
  });

  describe('#codes', function() {
    it('は、絵文字コードの配列を返す', function() {
      const emoji = new Emoji(
        'smiley',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEUAAAD+/v7KB/Q9AAAAFklEQVQI12P4z8TALMUAIu2Y2Bj+AwAbxwNogPCregAAAABJRU5ErkJggg=='
      );
      const emojis = Emojis.of(emoji);
      const codes = emojis.codes();

      Assert(codes instanceof Array);
      Assert(codes[0] === emoji.code);
    });
  });

  describe('#toArray', function() {
    it('は、Emojiの配列を返す', function() {
      const emoji = new Emoji(
        'smiley',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEUAAAD+/v7KB/Q9AAAAFklEQVQI12P4z8TALMUAIu2Y2Bj+AwAbxwNogPCregAAAABJRU5ErkJggg=='
      );
      const emojis = Emojis.of(emoji);
      const array = emojis.toArray();

      Assert(array instanceof Array);
      Assert(array[0] === emoji);
    });
  });
});
