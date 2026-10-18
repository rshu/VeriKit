// TodoStorage.ets — ArkData Preferences 持久化层。
// 每次变更 put 后 await flush；通过串行化 Promise 队列避免并发保存互相覆盖。

import { preferences } from '@kit.ArkData';
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit';

const STORE_NAME = 'todo_store';
const KEY_TODOS = 'todos_json';

export class TodoStorage {
  private store: preferences.Preferences | null = null;
  private saveQueue: Promise<void> = Promise.resolve();

  async init(context: common.UIAbilityContext): Promise<void> {
    const options: preferences.Options = { name: STORE_NAME };
    this.store = preferences.getPreferencesSync(context, options);
  }

  async load(): Promise<string> {
    if (this.store === null) {
      return '';
    }
    const value = this.store.getSync(KEY_TODOS, '');
    return typeof value === 'string' ? value : '';
  }

  // 串行排队保存，避免并发 flush 相互覆盖。
  save(json: string): Promise<void> {
    const task = async (): Promise<void> => {
      if (this.store === null) {
        throw new Error('TodoStorage not initialized');
      }
      await this.store.put(KEY_TODOS, json);
      await this.store.flush();
    };
    this.saveQueue = this.saveQueue.then(task, task);
    return this.saveQueue;
  }

  static formatError(err: BusinessError | Error): string {
    const be = err as BusinessError;
    if (be && typeof be.code === 'number') {
      return `保存失败 (code ${be.code})`;
    }
    return `保存失败 (${(err as Error).message})`;
  }
}
