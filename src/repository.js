import { Settings } from './settings.js';

export class SettingsRepository {
  static get keyName() {
    return '';
  }

  /*::
  store: Storage | RemoteStorage
  */
  constructor(store) {
    Object.assign(this, { store });
  }

  async getSettings() {
    const settingsJson = await this.store.getItem(this.constructor.keyName);
    if (!settingsJson) return;

    const settingsObj = JSON.parse(settingsJson);
    if (!settingsObj) return;

    return Settings.fromObject(settingsObj);
  }

  async saveSettings(settings) {
    const settingsJson = JSON.stringify(settings.toObject());
    return this.store.setItem(this.constructor.keyName, settingsJson);
  }
}
