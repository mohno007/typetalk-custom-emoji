import { Emoji } from '../src/emoji.js';
import Assert from 'assert';

describe('Emoji', function() {
  const code = 'smiley';
  const url =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEUAAAD+/v7KB/Q9AAAAFklEQVQI12P4z8TALMUAIu2Y2Bj+AwAbxwNogPCregAAAABJRU5ErkJggg==';
  const emoji = new Emoji(code, url);

  describe('#code', function() {
    it('は、絵文字コードを返す', function() {
      Assert(emoji.code === code);
    });
  });

  describe('#url', function() {
    it('は、絵文字のURLを返す', function() {
      Assert(emoji.url === url);
    });
  });
});
