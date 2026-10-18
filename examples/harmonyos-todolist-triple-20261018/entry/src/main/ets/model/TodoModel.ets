/**
 * 纯逻辑 Todo 模型：不引入任何 SDK 或第三方模块。
 * 负责：新增（含校验）、完成/恢复切换、删除、筛选、序列化与恢复。
 */

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed';

const MAX_TITLE_LENGTH = 80;
const ID_PATTERN = /^t(\d+)$/;

export class TodoModel {
  items: TodoItem[] = [];
  private counter: number = 0;

  /**
   * 新增条目：trim 后为空或超过 80 字符返回 false（不追加）；
   * 合法标题（含中文、重复标题）追加并返回 true，id 唯一。
   */
  add(title: string): boolean {
    const trimmed: string = title.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_TITLE_LENGTH) {
      return false;
    }
    const id: string = this.nextId();
    this.items.push({ id: id, title: trimmed, completed: false } as TodoItem);
    return true;
  }

  /** 切换指定条目的完成状态；id 不存在时不产生任何效果。 */
  toggle(id: string): void {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        this.items[i].completed = !this.items[i].completed;
        return;
      }
    }
  }

  /** 删除指定条目；id 不存在时不产生任何效果。 */
  remove(id: string): void {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        this.items.splice(i, 1);
        return;
      }
    }
  }

  /** 按筛选条件返回可见条目快照。 */
  visible(filter: TodoFilter): TodoItem[] {
    const result: TodoItem[] = [];
    for (let i = 0; i < this.items.length; i++) {
      const item: TodoItem = this.items[i];
      if (filter === 'all') {
        result.push(item);
      } else if (filter === 'active' && !item.completed) {
        result.push(item);
      } else if (filter === 'completed' && item.completed) {
        result.push(item);
      }
    }
    return result;
  }

  /** 序列化为 JSON 字符串（TodoItem[] 数组格式）。 */
  serialize(): string {
    return JSON.stringify(this.items);
  }

  /**
   * 从 serialize() 的格式恢复：保留各条 id 与状态；
   * 逐条校验，非法条目跳过；解析失败时保持空列表；
   * 恢复后重建 id 计数基线，保证后续新增 id 不碰撞。
   */
  restore(json: string): void {
    this.items = [];
    this.counter = 0;
    if (json.length === 0) {
      return;
    }
    let parsed: object | null = null;
    try {
      parsed = JSON.parse(json) as object;
    } catch (err) {
      return;
    }
    if (parsed === null || !Array.isArray(parsed)) {
      return;
    }
    const arr = parsed as Array<object>;
    for (let i = 0; i < arr.length; i++) {
      const entry: object | null = arr[i];
      if (entry === null || typeof entry !== 'object') {
        continue;
      }
      const rec = entry as Record<string, Object>;
      const id: Object = rec['id'];
      const title: Object = rec['title'];
      const completed: Object = rec['completed'];
      if (typeof id !== 'string' || id.length === 0) {
        continue;
      }
      if (typeof title !== 'string') {
        continue;
      }
      if (typeof completed !== 'boolean') {
        continue;
      }
      const item: TodoItem = { id: id, title: title, completed: completed };
      this.items.push(item);
      const match = ID_PATTERN.exec(id);
      if (match !== null) {
        const n: number = parseInt(match[1], 10);
        if (!isNaN(n) && n > this.counter) {
          this.counter = n;
        }
      }
    }
  }

  /** 生成不与既有条目碰撞的递增 id。 */
  private nextId(): string {
    let id: string = '';
    do {
      this.counter++;
      id = 't' + this.counter.toString();
    } while (this.hasId(id));
    return id;
  }

  private hasId(id: string): boolean {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        return true;
      }
    }
    return false;
  }
}
