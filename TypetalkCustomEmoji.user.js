// ==UserScript==
// @name         Typetalk custom-emoji
// @namespace    https://github.com/mohno007/typetalk-custom-emoji
// @homepage     https://github.com/mohno007/typetalk-custom-emoji
// @downloadURL  https://mohno007.github.io/typetalk-custom-emoji/TypetalkCustomEmoji.user.js
// @updateURL    https://mohno007.github.io/typetalk-custom-emoji/TypetalkCustomEmoji.user.js
// @supportURL   https://github.com/mohno007/typetalk-custom-emoji/issues/new
// @version      0.1.4
// @description  Emoji Reaction
// @author       m-ohno
// @match        https://typetalk.com/*
// @grant        none
// ==/UserScript==
//
// Copyright (c) 2018-2019 Motohiro OHNO
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

(function () {
  'use strict';

  class Emoji {
    constructor(code, url) {
      Object.assign(this, { code, url });
    }
  }

  class Emojis {
    static of(...emojis) {
      const map = emojis.reduce(
        (map, emoji) => map.set(emoji.code, emoji),
        new Map()
      );

      return new this(map);
    }

    constructor(map = new Map()) {
      Object.assign(this, { map });
    }

    get(code) {
      return this.map.get(code);
    }

    merge(other) {
      return new this.constructor(new Map([...this.map, ...other.map]));
    }

    codes() {
      return this.toArray().map(e => e.code);
    }

    toArray() {
      return [...this.map.values()];
    }
  }

  // temporary used

  const emojis = Emojis.of(
    new Emoji(
      'kansha',
      'data:image/png;base64,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'
    ),
    new Emoji(
      'shouti',
      'data:image/png;base64,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'
    ),
    new Emoji(
      'sugoi',
      'data:image/png;base64,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'
    )
  );

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

}());
