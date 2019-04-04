class TimeoutError extends Error {}

const emoji = {
  test:
    'data:image/png;base64,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',
};

const regex = new RegExp(`:(${Object.keys(emoji).join('|')}):`, 'g');

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

// class EmojiParser {}

// class EmojiRegistry {}

// class Emoji {}

const replaceEmoji = messagePost => {
  const messageText = messagePost.querySelector('.message__txt');

  if (!(messageText && messageText.childNodes)) return;

  Array.prototype.forEach.call(messageText.childNodes, text => {
    regex.lastIndex = 0;

    if (!(text instanceof Text)) return;

    const parent = text.parentNode;
    let textNode = text;

    for (;;) {
      const match = regex.exec(textNode.textContent);

      if (!match) break;

      // find emoji
      const key = match[1];
      const url = emoji[key];

      // create emoji
      const left = textNode.textContent.substr(0, match.index);
      const img = createEmojiImage(url, key);
      const right = textNode.textContent.substr(regex.lastIndex);

      const rightNode = document.createTextNode(right);

      textNode.textContent = left;
      parent.insertBefore(img, textNode.nextSibling);
      parent.insertBefore(rightNode, img.nextSibling);

      textNode = rightNode;
    }
  });
};

const handleMutation = mutationRecords => {
  mutationRecords.forEach(record => {
    if (record.type !== 'childList') return;

    console.log(record);

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
