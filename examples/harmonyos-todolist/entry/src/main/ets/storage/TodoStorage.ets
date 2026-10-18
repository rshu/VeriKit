import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';
export class TodoStorage {
  private store: preferences.Preferences | undefined = undefined;
  private pending: Promise<void> = Promise.resolve();
  async open(context: common.UIAbilityContext): Promise<string> {
    this.store = await preferences.getPreferences(context, { name: 'verikit_todo' });
    return await this.store.get('items', '[]') as string;
  }
  save(snapshot: string): Promise<void> {
    const store = this.store;
    if (store === undefined) return Promise.reject(new Error('Storage is not ready'));
    const operation = this.pending.catch(() => {}).then(async (): Promise<void> => {
      await store.put('items', snapshot);
      await store.flush();
    });
    this.pending = operation;
    return operation;
  }
}
