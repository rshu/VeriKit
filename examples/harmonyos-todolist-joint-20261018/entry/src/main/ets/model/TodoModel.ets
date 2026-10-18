// JOINT_CONTROLLED_CHECKPOINT
// 纯逻辑 Todo 模型：不引入任何 SDK 或第三方模块，供 UI 实际使用。

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed';

const MAX_TITLE_LENGTH = 80;
const MAX_ID_NUMBER = 9007199254740991; // Number.MAX_SAFE_INTEGER

export class TodoModel {
  public items: TodoItem[] = [];
  private seq: number = 0;

  // 新增：拒绝纯空白标题；trim 后最多 80 字符；允许中文与重复标题。
  public add(title: string): boolean {
    if (typeof title !== 'string') {
      return false;
    }
    const trimmed = title.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_TITLE_LENGTH) {
      return false;
    }
    const item: TodoItem = {
      id: this.generateId(),
      title: trimmed,
      completed: false
    };
    this.items.push(item);
    return true;
  }

  public toggle(id: string): void {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        this.items[i].completed = !this.items[i].completed;
        return;
      }
    }
  }

  public remove(id: string): void {
    const next: TodoItem[] = [];
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id !== id) {
        next.push(this.items[i]);
      }
    }
    this.items = next;
  }

  public visible(filter: TodoFilter): TodoItem[] {
    const result: TodoItem[] = [];
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (filter === 'all' ||
        (filter === 'active' && !item.completed) ||
        (filter === 'completed' && item.completed)) {
        result.push(item);
      }
    }
    return result;
  }

  // 序列化格式：{"version":1,"seq":number,"items":[{id,title,completed}...]}
  public serialize(): string {
    const payload: Record<string, Object> = {
      'version': 1,
      'seq': this.seq,
      'items': this.items
    };
    return JSON.stringify(payload);
  }

  // 恢复各条 ID 与状态；restore 后新增 ID 不与已有 ID 碰撞。
  public restore(json: string): void {
    this.items = [];
    this.seq = 0;
    if (!json || json.length === 0) {
      return;
    }
    try {
      const parsed: Record<string, Object> = JSON.parse(json) as Record<string, Object>;
      const rawItems = parsed['items'] as TodoItem[];
      if (Array.isArray(rawItems)) {
        for (let i = 0; i < rawItems.length; i++) {
          const raw = rawItems[i];
          if (raw && typeof raw.id === 'string' && typeof raw.title === 'string') {
            this.items.push({
              id: raw.id,
              title: raw.title,
              completed: raw.completed === true
            });
            this.observeId(raw.id);
          }
        }
      }
      const seq = parsed['seq'] as number;
      if (typeof seq === 'number' && seq > this.seq && Number.isInteger(seq)) {
        this.seq = seq;
      }
    } catch (e) {
      // 损坏数据按空列表处理，不抛出异常。
      this.items = [];
      this.seq = 0;
    }
  }

  private generateId(): string {
    this.seq = this.seq + 1;
    while (this.idExists(`${this.seq}`) && this.seq < MAX_ID_NUMBER) {
      this.seq = this.seq + 1;
    }
    return `${this.seq}`;
  }

  private idExists(id: string): boolean {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        return true;
      }
    }
    return false;
  }

  // 从已恢复的 ID 中提取序号，保证新增序号始终递增且不碰撞。
  private observeId(id: string): void {
    const num = Number.parseInt(id, 10);
    if (Number.isInteger(num) && `${num}` === id && num > this.seq) {
      this.seq = num;
    }
  }
}
