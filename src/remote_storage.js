class TimeoutError extends Error {}

export class RemoteStorage {
  static async create(storageUrl, timeout) {
    const storage = new RemoteStorage(storageUrl);
    await storage.appendToWindow(timeout);

    return storage;
  }

  /*::
    iframe: HTMLIFrameElement
    storageUrl: URL
  */
  constructor(storageUrl /*: URL */) {
    const iframe = document.createElement('iframe');
    iframe.src = storageUrl.toString();
    iframe.style.display = 'none';

    Object.assign(this, {
      iframe,
      storageUrl,
    });
  }

  async appendToWindow(timeout = 5000) {
    return new Promise((resolve, reject) => {
      this.iframe.addEventListener('load', () => resolve());
      window.document.body.appendChild(this.iframe);

      setTimeout(() => reject(new TimeoutError()), timeout);
    });
  }

  async request(message /* : { type: string, payload: {} } */, timeout = 5000) {
    const requestId = Math.random();
    const messageStr = JSON.stringify({ ...message, requestId });

    const responsePromise = this.listen(requestId, timeout);

    this.iframe.contentWindow.postMessage(messageStr, this.storageUrl.origin);

    return responsePromise;
  }

  async listen(expectedRequestId, timeout) {
    return new Promise((resolve, reject) => {
      const listener = event => {
        if (event.origin !== this.storageUrl.origin) return;

        const data = JSON.parse(event.data);

        if (data.requestId !== expectedRequestId) return;

        window.removeEventListener('message', listener);
        resolve(data);
      };

      setTimeout(() => {
        reject(new TimeoutError());
        window.removeEventListener('message', listener);
      }, timeout);

      window.addEventListener('message', listener, false);
    });
  }

  async getItem(key) {
    const { type, payload } = await this.request({
      type: 'GET_ITEM',
      payload: { key },
    });

    switch (type) {
      case 'OK':
        return payload.value;
      default:
        throw new Error(`Unknown type '${type}'`);
    }
  }

  async setItem(key, value) {
    const { type } = await this.request({
      type: 'SET_ITEM',
      payload: { key, value },
    });

    switch (type) {
      case 'OK':
        return;
      default:
        throw new Error(`Unknown type '${type}'`);
    }
  }
}
