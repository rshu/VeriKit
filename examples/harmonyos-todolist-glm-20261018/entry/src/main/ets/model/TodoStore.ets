// 持久化层：ArkData Preferences 真实存储。每次变更 put 后 await flush；
// 用串行 Promise 链避免并发保存相互覆盖。
import { preferences } from '@kit.ArkData';
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit';

const STORE_NAME = 'todolist_store';
const KEY_TODOS = 'todolist_json';

export class TodoStore {
  private store: preferences.Preferences | null = null;
  private saveChain: Promise<boolean> = Promise.resolve(true);

  async init(context: common.Context): Promise<void> {
    const options: preferences.Options = { name: STORE_NAME };
    this.store = preferences.getPreferencesSync(context, options);
  }

  async load(): Promise<string> {
    if (this.store === null) {
      throw new Error('store not initialized');
    }
    const val: preferences.ValueType = this.store.getSync(KEY_TODOS, '');
    return val as string;
  }

  // 串行化保存：后续保存排队等待前一次 flush 完成，避免并发覆盖。
  save(json: string): Promise<boolean> {
    const task = this.saveChain.then((): Promise<boolean> => this.doSave(json));
    this.saveChain = task.then((): boolean => true, (): boolean => false);
    return task;
  }

  private async doSave(json: string): Promise<boolean> {
    if (this.store === null) {
      throw new Error('store not initialized');
    }
    const store = this.store;
    await store.put(KEY_TODOS, json);
    await store.flush();
    return true;
  }
}

// ArkTS 不允许 unknown：收窄为具体类型联合，调用点为 catch 子句变量（兼容 BusinessError/Error/字符串）。
export function toErrorMessage(err: BusinessError | Error | string | null | undefined): string {
  if (err === null || err === undefined) {
    return String(err);
  }
  if (typeof err === 'string') {
    return err;
  }
  const be = err as BusinessError;
  if (be.code !== undefined) {
    return `${be.message} (code: ${be.code})`;
  }
  return (err as Error).message;
}
