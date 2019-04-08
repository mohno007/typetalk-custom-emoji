import { emojis } from './emojis_definition.js';
// import { EmojiParser } from './emoji_parser.js';

class TimeoutError extends Error {}

// const parser = new EmojiParser(emojis);

const regex = new RegExp(`:(${emojis.codes().join('|')}):`, 'g');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const retry = async (count, interval, fn, ...args) => {
  for (let i = 0; i < count; ++i) {
    const result = await fn(...args);

    if (result) return result;

    await sleep(interval);
  }

  throw new TimeoutError(count * interval);
};

const isMessagesContainer = maybeMessagesContainer =>
  maybeMessagesContainer instanceof HTMLDivElement &&
  maybeMessagesContainer.classList.contains('message');

const extractMessagePost = nodeList =>
  Array.prototype.filter.call(
    nodeList,
    e => e.classList && e.classList.contains('message__post')
  );

const createEmojiImage = (url, key) => {
  const emoji = `:${key}:`;
  const img = document.createElement('span');

  Object.assign(img, {
    title: emoji,
    textContent: emoji,
  });

  Object.assign(img.style, {
    display: 'inline-block',
    backgroundImage: `url(${url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '22px',
    width: '22px',
    color: 'transparent',
    fontSize: 0,
    textIndent: '100%',
    verticalAlign: 'top',
  });

  return img;
};

const replaceEmoji = messagePost => {
  const messageText = messagePost.querySelector('.message__txt-content');

  if (!(messageText && messageText.childNodes)) return;

  const texts = [...messageText.childNodes].reverse();

  do {
    const text = texts.pop();
    if (!(text instanceof Text)) return;

    const parent = text.parentNode;
    let textNode = text;

    for (;;) {
      regex.lastIndex = 0;
      const match = regex.exec(textNode.textContent);

      if (!match) break;

      // find emoji
      const emoji = emojis.get(match[1]);

      // create emoji
      const left = textNode.textContent.substr(0, match.index);
      const img = createEmojiImage(emoji.url, emoji.code);
      const right = textNode.textContent.substr(regex.lastIndex);

      const rightNode = document.createTextNode(right);

      textNode.textContent = left;
      parent.insertBefore(img, textNode.nextSibling);
      parent.insertBefore(rightNode, img.nextSibling);

      textNode = rightNode;
      texts.push(rightNode);
    }
  } while (texts.length > 0);
};
const handleMutation = mutationRecords => {
  mutationRecords.forEach(record => {
    if (record.type !== 'childList') return;

    if (!isMessagesContainer(record.target)) return;

    const messages = extractMessagePost(record.addedNodes);

    messages.forEach(replaceEmoji);
  });
};

(async function() {
  const mainContent = await retry(10, 500, () =>
    document.querySelector('body')
  );

  const observer = new MutationObserver(handleMutation);

  observer.observe(mainContent, { childList: true, subtree: true });
})();
